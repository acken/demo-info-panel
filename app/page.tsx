"use client"

import RightToolbar from "./navigation/right-toolbar";
import "./globals.css"; // Assuming you have a CSS file for styling
import Logo from "./navigation/logo";
import TopBar from "./personal-publications/top-bar";
import PersonalPublications from "./personal-publications/personal-publications";

import { use, useEffect, useState } from 'react';
import { PublicationFull } from "@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications";
import { PublicationsInterceptorHandler } from "./uniscale-session/publications-interceptors";

export default function Home() {
  const [publicationTypeFilter, setPublicationTypeFilter] = useState<string>('');
  const [allPublications, setAllPublications] = useState<PublicationFull[]>([]);

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '20px', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingBottom: '20px' }}>
        <div style={{ flex: '0 1 auto' }}>
          <Logo />
        </div>
        <div style={{ flex: '1 1 auto', margin: '0 20px' }}>
          <TopBar 
            onFilterChange={function (filter: string): void {
              setPublicationTypeFilter(filter);
            }} 
            publications={allPublications} />
        </div>
        <div style={{ flex: '0 1 auto' }}>
          <RightToolbar />
        </div>
      </div>
      <PersonalPublications
        onPublicationCreated={(publications) => setAllPublications(publications)}
        publicationTypeFilter={publicationTypeFilter} />
    </div>
  );
}
