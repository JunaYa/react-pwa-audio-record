'use client'
import { Button } from "antd-mobile";
import { useState } from "react";

const DefferdPrompt = () => {
  const [result, showResult] = useState('')
  const [showInstall, setShowInstall] = useState(false)
  let deferredPrompt: any = null

  async function installApp() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      showResult("🆗 Installation Dialog opened");
      // Find out whether the user confirmed the installation or not
      const { outcome } = await deferredPrompt.userChoice;
      // The deferredPrompt can only be used once.
      deferredPrompt = null;
      // Act on the user's choice
      if (outcome === 'accepted') {
        showResult('😀 User accepted the install prompt.');
      } else if (outcome === 'dismissed') {
        showResult('😟 User dismissed the install prompt');
      }
      // We hide the install button
      setShowInstall(false)
    }
  }

  // window.addEventListener("DOMContentLoaded", async event => {
  //   if ('BeforeInstallPromptEvent' in window) {
  //     showResult("⏳ BeforeInstallPromptEvent supported but not fired yet");
  //   } else {
  //     showResult("❌ BeforeInstallPromptEvent NOT supported");    
  //   }
  // });

  // window.addEventListener('beforeinstallprompt', (e) => {
  //   // Prevents the default mini-infobar or install dialog from appearing on mobile
  //   e.preventDefault();
  //   // Save the event because you’ll need to trigger it later.
  //   deferredPrompt = e;
  //   // Show your customized install prompt for your PWA
  //   setShowInstall(true)
  //   showResult("✅ BeforeInstallPromptEvent fired");
    
  // });
  
  // window.addEventListener('appinstalled', (e) => {
  //   showResult("✅ AppInstalled fired");
  // });
  
  return (
    <div className="fcc-center gap-8">
      {showInstall && <Button onClick={installApp}>Install</Button>}
      <div>{result}</div>
    </div>
  )
}

export default DefferdPrompt