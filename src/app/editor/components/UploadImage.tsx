import { useGoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const UploadImage = ({setImages}) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const fileInputRef = useRef(null);
    const googleDriveButtonRef = useRef(null);


    const CLIP_RECT = { x: 732, y: 240, width: 200, height: 284 };
  
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new window.Image();
            img.onload = function() {
            const imageWidth = this.width;
            const imageHeight = this.height;
            const imageAspectRatio = imageWidth / imageHeight;
            const clipAspectRatio = CLIP_RECT.width / CLIP_RECT.height;
    
            let scaledWidth, scaledHeight;
    
            // Determine whether to scale by width or height
            if (imageAspectRatio > clipAspectRatio) {
                // Image is wider → constrain by width (200px)
                scaledWidth = CLIP_RECT.width;
                scaledHeight = scaledWidth / imageAspectRatio;
            } else {
                // Image is taller → constrain by height (284px)
                scaledHeight = CLIP_RECT.height;
                scaledWidth = scaledHeight * imageAspectRatio;
            }
    
            console.log("Original (px):", imageWidth, imageHeight);
            console.log("Scaled (px):", scaledWidth, scaledHeight);
    
            setImages({
                name: file.name,
                dataUrl: e.target.result,
                width: imageWidth,
                height: imageHeight,
                scaledWidth: scaledWidth,  // Fits inside CLIP_RECT
                scaledHeight: scaledHeight,
                clipRect: CLIP_RECT,
            });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        }
    };
    
  
    // Load Dropbox script
    useEffect(() => {
      const loadDropboxScript = () => {
        if (window.Dropbox) return;
        const script = document.createElement('script');
        script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
        script.id = 'dropboxjs';
        script.dataset.appKey = process.env.NEXT_PUBLIC_DROPBOX_APP_KEY;
        script.onerror = () => setError('Failed to load Dropbox script');
        document.body.appendChild(script);
      };
      loadDropboxScript();
    }, []);
  
    // Load Google API script
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google API script loaded');
      };
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
    // Google Drive login
    const login = useGoogleLogin({
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      onSuccess: (tokenResponse) => {
        setAccessToken(tokenResponse.access_token);
        loadGoogleDrivePicker(tokenResponse.access_token);
      },
      onError: () => setError('Failed to authenticate with Google'),
    });
  
    // Load Google Drive picker
    const loadGoogleDrivePicker = (token: string) => {
      try {
        window.gapi.load('picker', () => {
          const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
          view.setMimeTypes('image/png,image/jpeg,image/gif,image/svg+xml');
          console.log(process.env.NEXT_PUBLIC_GOOGLE_API_KEY)
          console.log(token)
          const picker = new window.google.picker.PickerBuilder()
            .addView(view)
            .setOAuthToken(token)
            .setDeveloperKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!)
            .setCallback((data: any) => {
              if (data.action === window.google.picker.Action.PICKED) {
                const fileId = data.docs[0].id;
                getGoogleDriveImageUrl(fileId, token);
              }
            })
            .build();
          
          picker.setVisible(true);
        });
      } catch (err) {
        setError('Failed to load Google Drive picker');
      }
    };
  
    // Get Google Drive image URL
    const getGoogleDriveImageUrl = async (fileId: string, token: string) => {
      try {
        const response = await fetch(
          `https://content.googleapis.com/drive/v2/files/${fileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        const data = await response.json();
        console.log(data)
        if (data.thumbnailLink) {
          setImages(data.thumbnailLink);
        } else {
          setError('No image URL found');
        }
      } catch (err) {
        setError('Failed to get image from Google Drive');
      }
    };
  
    // Handle Google Drive button click
    const handleGoogleDriveClick = () => {
      setError(null);
      if (accessToken) {
        loadGoogleDrivePicker(accessToken);
      } else {
        login();
      }
    };
  
    // Handle Dropbox click
    const handleDropboxClick = () => {
      setError(null);
      try {
        if (!window.Dropbox) {
          throw new Error('Dropbox script not loaded');
        }
        window?.Dropbox?.choose({
          success: (files: any) => {
            if (files[0]?.link) {
              setImages((values) => [...values, files[0].link]);
            }
          },
          error: (err: any) => setError(err.message || 'Dropbox error'),
          linkType: 'direct',
          multiselect: false,
          extensions: ['.png', '.jpg', '.jpeg', '.gif'],
        });
      } catch (err) {
        setError(err.message);
      }
    };
  
    const handleButtonClick = () => {
      fileInputRef?.current.click();
    };
  
    return (
      <div className="flex flex-col w-full h-full p-8">
        <div className="flex justify-between w-full mb-8">
          <p className='text-xl font-bold'>New upload</p>
          <span className="material-symbols-outlined">
            close
          </span>
        </div>
        
        <div className="flex flex-col gap-4 mb-6">
          {/* Device Upload */}
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              style={{ display: 'none', width: '100%', height: '100%' }}
            />
            <button
              onClick={handleButtonClick}
              className='flex gap-4 w-full p-5 border-[1px] rounded-md border-[#c5c5c5] cursor-pointer'
            >
              <span className="material-symbols-outlined">
                computer
              </span>
              <p className=''>My device</p> 
            </button>
          </>
  
          {/* Dropbox */}
          <button 
            onClick={handleDropboxClick}
            className="flex gap-4 w-full p-4 border-[1px] cursor-pointer rounded-md border-[#c5c5c5]"
          >
            <Image src={'/buttonIcons/dropbox.png'} alt='upload' width={30} height={10}/>
            <p className=''>Dropbox</p>
          </button>
  
          {/* Google Drive */}
          <button 
            onClick={handleGoogleDriveClick}
            ref={googleDriveButtonRef}
            className="flex gap-4 w-full p-4 border-[1px] cursor-pointer rounded-md border-[#c5c5c5]"
          >
            <Image src={'/buttonIcons/drive.png'} alt='upload' width={30} height={10}/>
            <p className=''>Google Drive</p>
          </button>
        </div>
  
        <div className="w-full p-4 bg-[#ebebeb] rounded-md">
          <p className='text-xl font-bold'>Print file requirements</p>
          <ul className='p-1 ml-6 list-disc text-md'>
            <li>
              <p>JPG, PNG and SVG file types supported</p>
            </li>
            <li>
              <p>Maximum 100 MiB (JPG, PNG) or 20 MiB (SVG)</p>
            </li>
            <li>
              <p>Print area size 3852 × 4398 px (300 DPI)</p>
            </li>
            <li>
              <p>Maximum resolution 30000 x 30000 px</p>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  export default UploadImage;