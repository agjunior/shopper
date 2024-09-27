import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imageGas from "../../assets/image-gas.png";
import imageWater from "../../assets/image-water.png";
import Button from "../../components/Button";
import { useMeasure } from "../../hooks/useMeasure";
import { useCustomer } from "../../contexts/CustomerContext";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const UploadMeasure = () => {
  const navigate = useNavigate();
  const { uploadMeasure } = useMeasure();
  const { code: CustomerCode } = useCustomer();
  const { state } = useLocation();

  const image = state.type === 'GAS' ? imageGas : imageWater;

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    await setIsCameraOn(true);
    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageSrc = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageSrc);
        setIsImageCaptured(true);
      }
    }
  };

  const uploadImage = async () => {
    if (capturedImage) {
      setIsUploading(true);
      const measure = await uploadMeasure({
        image: capturedImage.replace('data:', '').replace(/^.+,/, ''),
        customer_code: CustomerCode,
        measure_datetime: new Date().toISOString(),
        measure_type: state.type,
      });

      if (measure) {
        navigate('/confirm', { state: { ...measure } });
      }
    }
  };

  const header = <Header title="Nova medição" />;

  if (isUploading) {
    return (
      <Container align="center">
        <div style={{ textAlign: 'center', padding: '0 20px' }}>
          <h2>Enviando a foto...</h2>
          <p>Por favor, aguarde enquanto enviamos a foto do seu medidor.</p>
        </div>
      </Container>
    );
  }

  if (isCameraOn) {
    return (
      <Container
        align="center"
        header={header}
        footer={
          (isImageCaptured) ? (
            <Footer>
              <Button text="Tirar outra foto" background="rgb(247, 128, 34)" border="rgb(247, 128, 34)" onClick={() => {
                setIsImageCaptured(false),
                startCamera()
              }} />
              <Button text="Enviar foto" onClick={uploadImage} />
            </Footer>
          ) : (
            <Footer>
                <Button text="Capturar" onClick={captureImage} />
            </Footer>
          )
        }
      >
        <div style={{ textAlign: 'center', padding: '0 20px' }}>
          {isImageCaptured ? (
            <img src={capturedImage!} alt="Captured" width="100%" style={{ borderRadius: '15px' }}/>
          ) : (
            <>
              <video ref={videoRef} style={{ width: '100%', borderRadius: '15px' }} />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </>
          )}
          <p>Certifique que os números estão bem nítidos na imagem</p>
        </div>
      </Container>
    );
  }

  return (
    <Container
      align="center"
      header={header}
      footer={
        <Footer>
          <Button text="Continuar" onClick={startCamera} />
        </Footer>
      }
    >
      <div style={{ textAlign: 'center', padding: '0 20px' }}>
        <h2>Envie a foto do seu medidor</h2>
        <p>Tire uma foto dos números do seu medidor como no exemplo abaixo:</p>
        <img src={image} alt="Example" width="100%" style={{ borderRadius: '15px', maxHeight: '150px', width: 'auto' }} />
        <p>Precisaremos de acesso a sua câmera.</p>
        <p>Na próxima tela, por favor confirme a solicitação.</p>
      </div>
    </Container>
  );
  
}

export default UploadMeasure;