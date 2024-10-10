import React from 'react';
import PublicationsList from './publications-list';
import { PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications';
import PublicationView from './publication-view';

interface PublicationsAreaProps {
    publications: PublicationFull[];
    onOnlyWeeklyFilter: (option: string) => void;
}

export default function PublicationsArea({ publications, onOnlyWeeklyFilter }: PublicationsAreaProps) {
    const [selectedPublication, setSelectedPublication] = React.useState<PublicationFull | null>(null);
    return (
        <div style={{ display: 'flex', paddingTop: '20px' }}>
            <div style={{ width: '30%' }}>
                <PublicationsList 
                    onTabChange={onOnlyWeeklyFilter}
                    publications={publications} 
                    onPublicationSelected={function (publication: PublicationFull): void {
                        setSelectedPublication(publication);
                    } } />
            </div>
            <div style={{ width: '70%', paddingLeft: '10px' }}>
                <PublicationView 
                    publication={selectedPublication} />
            </div>
        </div>
    );
};
