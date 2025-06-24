import React, {useState} from 'react'
import UploadImage from './UploadImage';
import AddText from './AddText';
import MyLibrary from './MyLibrary';
import Graphics from './Graphics';
import MyTemplates from './MyTemplates';


const leftBarMenus = [
  {
    icon: 'arrow_back',
  },
  {
    icon: 'add_photo_alternate',
    text: 'Upload',
  },
  {
    icon: 'text_fields',
    text: 'Add text',
  },
  {
    icon: 'photo_library',
    text: 'My library',
  },
  {
    icon: 'category',
    text: 'Graphics',
  },
  {
    icon: 'dashboard',
    text: 'My templates',
  }
]

const LeftBar = ({setImages}) => {
  const [activeMenu, setActiveMenu] = useState(0);
  return (
    <div className=' relative h-screen w-[70px] bg-[white] border-r-[1px] border-[#c5c5c5] flex flex-col items-center'>       
      {leftBarMenus.map((item, index) => (
        <div key={index} onClick={() => setActiveMenu(activeMenu && (activeMenu===index+1)? 0 : index+1)} className="flex h-[65px] w-full flex-col items-center justify-center cursor-pointer hover:bg-[#f5f5f5]">
          <span className="material-symbols-outlined">
            {item.icon}
          </span>
          {item.text && <span className='text-[9px] mt-1'>{item.text}</span>}
        </div>
      ))}
      {activeMenu===2 && <div className='absolute top-[65px] z-20 left-[68px] w-[350px] h-[785px] bg-[#ffffff] border-[1px] border-[#c5c5c5]'>
        <UploadImage setImages={setImages}/>
        </div>}
      {activeMenu === 3 && <div className='absolute top-[65px] z-20 left-[68px] w-[350px] h-[785px] bg-[#ffffff] border-[1px] border-[#c5c5c5]'>
        <AddText />
      </div>}
      {activeMenu === 4 && <div className='absolute top-[65px] z-20 left-[68px] w-[350px] h-[785px] bg-[#ffffff] border-[1px] border-[#c5c5c5]'>
        <MyLibrary />
      </div>}
      {activeMenu === 5 && <div className='absolute top-[65px] z-20 left-[68px] w-[350px] h-[785px] bg-[#ffffff] border-[1px] border-[#c5c5c5]'>
        <Graphics />
      </div>}
      {activeMenu === 6 && <div className='absolute top-[65px] z-20 left-[68px] w-[350px] h-[785px] bg-[#ffffff] border-[1px] border-[#c5c5c5]'>
        <MyTemplates />
      </div>}
    </div>
  )
}



export default LeftBar