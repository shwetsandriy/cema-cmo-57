import { CustomView } from "@/components/CalendarView";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { launchAsync } from "@microsoft/immersive-reader-sdk"


const Index = () => {
  const [activeView, setActiveView] = useState("month"); 
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedEventType, setSelectedEventType] = useState("All");
  const [selectedCsa, setSelectedCsa] = useState("All");
  const [selectedScale, setSelectedScale] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  const [token, setToken] = useState('');

  const styles = {
    immersive_reader_button: {
      marginTop: 25,
      float: 'right'
    }
  };

  const getCredentials = async () => {

    // Verify environment variables values
    if( !import.meta.env.VITE_REACT_APP_CLIENT_ID ){
      console.log("ClientId is null! Did you add that info to .env file? See ReadMe.md.")
    }
    if( !import.meta.env.VITE_REACT_APP_CLIENT_SECRET ){
      console.log("Client Secret is null! Did you add that info to .env file? See ReadMe.md.")
    }
    if( !import.meta.env.VITE_REACT_APP_TENANT_ID ){
      console.log("TenantId is null! Did you add that info to .env file? See ReadMe.md.")
    }
    if( !import.meta.env.VITE_REACT_APP_SUBDOMAIN ){
      console.log("Subdomain is null! Did you add that info to .env file? See ReadMe.md.")
    }

    // Form details to be passed to fetch
    const details = {
      grant_type: 'client_credentials',
      client_id: import.meta.env.VITE_REACT_APP_CLIENT_ID,
      client_secret: import.meta.env.VITE_REACT_APP_CLIENT_SECRET,
      resource: 'https://cognitiveservices.azure.com/'
    };
    const formBody = new URLSearchParams(details).toString();
    // Build up the form data -> it needs to be converted to a form type
//     let formBodyArr = [];
// for (var property in details) {
//   var encodedKey = encodeURIComponent(property);
//   var encodedValue = details[property].startsWith("http") 
//     ? details[property]  // Якщо значення URL, не кодуємо його
//     : encodeURIComponent(details[property]);

//   formBodyArr.push(encodedKey + "=" + encodedValue);
// }

    // const formBodyStr = formBodyArr.join("&"); // This is what we can pass to the post request

    try {
      const response = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      const json = await response.json();
      if (response.ok) {
        console.log("Access Token:", json.access_token);
        setToken(json.access_token);
      } else {
        console.error("Error fetching token:", json);
      }
    } catch (err) {
      console.error("Request failed", err);
    }
  }

  const launchReader = async () => {

    const data = {
      title: "Immersive Reader",
      chunks: [{
        content: document.getElementById('ir-content').innerHTML,
        mimeType: "text/html"
      }]
    };

    // Learn more about options https://docs.microsoft.com/azure/cognitive-services/immersive-reader/reference#options
    const options = {
      "uiZIndex": 2000,
      "cookiePolicy": 1
    };

    try {
      await launchAsync(token, import.meta.env.VITE_REACT_APP_SUBDOMAIN, data, options)
    }
    catch (error) {
      console.log(error);
      alert("Error in launching the Immersive Reader. Check the console.");
    }
  }

  const removeFilter = (filterValue) => {
    if (filterValue === selectedArea) {
      setSelectedArea("All");
    }
    if (filterValue === selectedEventType) {
      setSelectedEventType("All");
    }
    if (filterValue === selectedCsa) {
      setSelectedCsa("All");
    }
    if (filterValue === selectedScale) {
      setSelectedScale("All"); 
    }
    if (filterValue === selectedCountry) {
      setSelectedCountry("All"); 
    }
  };

  const clearAllFilters = () => {
      setSelectedArea("All");
      setSelectedEventType("All");
      setSelectedCsa("All");
      setSelectedScale("All"); 
      setSelectedCountry("All"); 
  };
  
  useEffect(() => {
    getCredentials();
  }, [])

  return (
    <div id={'ir-content'}>
<SidebarProvider>
      <div className="min-h-screen w-full flex flex-col">
        {/* Header */}
        <header className="w-full bg-[#F2FCE2] shadow-sm py-2 px-4 sticky top-0 z-50">
          <div className="mx-auto flex items-center justify-start gap-2">
            <img
              src="https://www.microsoft.com/favicon.ico"
              alt="Microsoft Logo"
              className="w-6 h-6"
            />
            <span className="text-[#8E9196] font-semibold text-lg">Microsoft</span>
          </div>
        </header>

        {/* Sidebar + Main Content */}
        <div className="flex flex-1">
          <AppSidebar 
            setActiveView={setActiveView} 
            activeView={activeView}  
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea} 
            selectedEventType={selectedEventType}
            setSelectedEventType={setSelectedEventType}
            selectedCsa={selectedCsa}
            setSelectedCsa={setSelectedCsa}
            selectedScale={selectedScale}
            setSelectedScale={setSelectedScale}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}/>
          <div className="flex-1 px-4 py-4">
            <img src="banner.png"></img>
            {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Calendar</h1> */}
            <CustomView 
              activeView={activeView} 
              setActiveView={setActiveView} 
              selectedArea={selectedArea}
              selectedEventType={selectedEventType}
              selectedCsa={selectedCsa}
              selectedScale={selectedScale} 
              selectedCountry={selectedCountry}
              removeFilter={removeFilter}
              clearAll={clearAllFilters} />
              
          </div>
        </div>
      </div>
    </SidebarProvider>
    <button 
              className="fixed bottom-4 z-50 mt-2 ml-4 rounded-[calc(0.5rem-2px)] border border-gray-300 px-4 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              data-button-style="iconAndText" 
              data-locale="en" 
              onClick={launchReader}
            >
              Immersive Reader
            </button>
    </div>
    
  );
};

export default Index;
