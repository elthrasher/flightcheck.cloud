import './App.css';

import { useState } from 'react';

import { AwsServiceSelector } from './components/aws-service-selector';
import { ServiceDetails } from './components/service-details';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

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
}

export default App;
