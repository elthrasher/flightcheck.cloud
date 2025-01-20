import './App.css';

import { useEffect, useMemo, useState } from 'react';

import { AwsServiceSelector } from './components/aws-service-selector';
import { ServiceDetails } from './components/service-details';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';

const App = () => {
  const location = useMemo(() => new URL(window.location.href), []);
  const path = location.pathname.split('/')[1];
  console.log(path);

  const [selectedService, setSelectedService] = useState<string | null>(path);
  useEffect(() => {
    if (selectedService) {
      location.pathname = `/${selectedService}`;
      window.history.pushState({}, '', location.toString());
    } else {
      location.pathname = '/';
      window.history.pushState({}, '', location.toString());
    }
  }, [location, selectedService]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-8">
          FlightCheck.cloud
        </h1>
        {selectedService ? (
          <ServiceDetails
            serviceId={selectedService}
            onBack={() => setSelectedService(null)}
          />
        ) : (
          <>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              An opinionated take on how to build on AWS with best practices.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              To get started, choose a service!
            </p>
            <AwsServiceSelector
              onServiceSelect={(service) => setSelectedService(service.id)}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
