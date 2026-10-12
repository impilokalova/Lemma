import {useEffect} from 'react';

/**
 * Gentle friction against casual copying of decorative images.
 * This is NOT DRM: screenshots, browser developer tools, direct image
 * requests, and saved network assets remain possible.
 * Never interfere with text selection, keyboard shortcuts, forms or links.
 */
export function ContentProtection(){
 useEffect(()=>{
  const onContextMenu=(event:MouseEvent)=>{
   const target=event.target;
   if(!(target instanceof Element))return;
   // Only suppress the native image-specific context menu.
   if(target.closest('img, picture, [data-protected-artwork]')){
    event.preventDefault();
   }
  };
  const onDragStart=(event:DragEvent)=>{
   const target=event.target;
   if(target instanceof Element && target.closest('img, picture, [data-protected-artwork]')){
    event.preventDefault();
   }
  };
  document.addEventListener('contextmenu',onContextMenu);
  document.addEventListener('dragstart',onDragStart);
  return ()=>{
   document.removeEventListener('contextmenu',onContextMenu);
   document.removeEventListener('dragstart',onDragStart);
  };
 },[]);
 return null;
}
