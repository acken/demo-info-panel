import React, { useEffect } from 'react';
import WelcomeToolbar from './publications-view/welcome-toolbar';
import PublicationsArea from './publications-view/publications-area';
import { initializeDispatcher } from '../uniscale-session/dispatcher';
import { DispatcherSession } from '@uniscale-sdk/ActorCharacter-InfoPanel';
import { SearchAndFilterPublications } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications_1_0/ServiceToModule/Publications/SearchAndFilterPublicatoins';
import { PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications';
import { PublicationsInterceptorHandler } from '../uniscale-session/publications-interceptors';

/** 
 * Using the Uniscale SDK to call defined endpoints through a dispatcher session
 * Using the Uniscale dispatcher you can use the Request method in and pass an instance of a class based on the RequestResponseBackendAction
 * base class using the static .With method to set the input. What is passed into the .With. For the result class that comes back. If the Success property is true
 * it has succeeded and you will find the result is in the Value property. If the Success property is false it can use the .Error.Details.UserError
 * to get the error message. It should use the feature class directly as a static class when using the .With method.
 * 
 * View functionality
 *   
 *   There are 3 flows available in this use case:
 *     Selecting an item
 *       When the user clicks on a badge in the list that publication should be displayed in the 
 *       Publications view
 *       .
 *     
 *     Ordering
 *       The publications should be ordered by date and time published where the latest publications is
 *       shown first.
 *     
 *     All and this week filters
 *       By default the all posts filter should be selected. This will provide the user with a list of all
 *       messages that they can access. As stated the toolbar filters and searches are also applied
 *       regardless of the user selects all publications or this week only.
 *   
 *   Endpoints available to implement the flow:
 *     InfoPanelPlayground.Publications.Publications.SearchAndFilterPublications
 *       The following existing class is used for input:
 *       InfoPanelPlayground.Publications.Publications.EndpointContracts.SearchAndFilterPublicationsInput
 *         # The publicationType property is a Terminology (id: 5401420b-cee3-4455-8044-c2f8fc046e06) with the following codes:
 *         #   Casual - Casual
 *         #   Important - Important
 *         publicationType: string
 *         onlyCurrentWeek: boolean
 *         onlyActionable: boolean
 *         searchQuery: string
 *       The following existing class is used for output:
 *       InfoPanelPlayground.Publications.Publications.PublicationFull
 *         publishedAt: Date
 *         body: string
 *         shortMessage: string
 *         actionable: boolean
 *         # The publicationType property is a Terminology (id: 5401420b-cee3-4455-8044-c2f8fc046e06) with the following codes:
 *         #   Casual - Casual
 *         #   Important - Important
 *         publicationType: string
 *         publicationIdentifier: string
 *         # The targetDepartments property is a Terminology (id: 69a49938-29d2-413f-80d5-3555bb13c267) with the following codes:
 *         #   HR - HR
 *         #   CX - Customer care
 *         #   Development - Development
 *         #   Sales - Sales
 *         #   Infrastructure - IT infrastructure
 *         #   Management - Management
 *         #   Product - Product
 *         targetDepartments: string[]
 *         title: string
 *         # The author property is a Terminology (id: 69a49938-29d2-413f-80d5-3555bb13c267) with the following codes:
 *         #   HR - HR
 *         #   CX - Customer care
 *         #   Development - Development
 *         #   Sales - Sales
 *         #   Infrastructure - IT infrastructure
 *         #   Management - Management
 *         #   Product - Product
 *         author: string
 * 
 */

interface PersonalPublicationsProps {
    publicationTypeFilter: string;
    onPublicationCreated: (publications: PublicationFull[]) => void;
}

const PersonalPublications: React.FC<PersonalPublicationsProps> = ({ publicationTypeFilter, onPublicationCreated }) => {
    const [publications, setPublications] = React.useState<PublicationFull[]>([]);
    const [onlyActionable, setOnlyActionable] = React.useState<boolean>(false);
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [thisWeekOnly, setThisWeekOnly] = React.useState<boolean>(false);

    const fetchPublications = async (isActionable: boolean, query: string, onlyCurrentWeek: boolean, type: string) => {
        console.log("Pre - Fetching publications")
        const dispatcher = await initializeDispatcher();
        console.log("Fetching publications")

        const input = {
            publicationType: type === 'All' ? undefined : type,
            onlyCurrentWeek,
            onlyActionable: isActionable,
            searchQuery: query
        };

        const result = await dispatcher.request(SearchAndFilterPublications.with(input));

        if (result.success) {
            setPublications(result.value || []);
        }
    };

    useEffect(() => {
        fetchPublications(onlyActionable, searchQuery, thisWeekOnly, publicationTypeFilter);
    }, [onlyActionable, searchQuery, thisWeekOnly, publicationTypeFilter]);

    return (
        <div style={{ textAlign: 'left', width: '1200px', paddingTop: '20px' }}>
            <WelcomeToolbar 
                onFilterChange={(isActionable: boolean) => {
                    setOnlyActionable(isActionable);
                }}
                onSearchChange={(query: string) => {
                    setSearchQuery(query);
                }}
                onNewPublication={(publication: PublicationFull) => {
                    fetchPublications(onlyActionable, searchQuery, thisWeekOnly, publicationTypeFilter);
                    onPublicationCreated(publications)
                }} />
            <PublicationsArea 
                publications={publications} 
                onOnlyWeeklyFilter={(option: string) => {
                    const onlyCurrentWeek = option === 'THIS_WEEK';
                    setThisWeekOnly(onlyCurrentWeek)
                }} />
        </div>
    );
};

export default PersonalPublications;
