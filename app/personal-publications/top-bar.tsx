
/** 
 * Using the Uniscale SDK to call defined endpoints through a dispatcher session
 * Using the Uniscale dispatcher you can use the Request method in and pass an instance of a class based on the RequestResponseBackendAction
 * base class using the static .With method to set the input. What is passed into the .With. For the result class that comes back. If the Success property is true
 * it has succeeded and you will find the result is in the Value property. If the Success property is false it can use the .Error.Details.UserError
 * to get the error message. It should use the feature class directly as a static class when using the .With method.
 * 
 * View functionality
 *   
 *   There are 4 flows available in this use case:
 *     Actions suggested badge
 *       The actions suggested badge will only be visible if the user has any actionable publications within
 *       the last 4 weeks. It will then show the number of publications marked as actionable that the user
 *       can see.
 *       
 *       Acceptance criteria:
 *         The actions suggested badge is only visible if the user has actionable publications within the last
 *         4 weeks.
 *         It should show the number of actionable publications the user can see.
 *     
 *     All publications
 *       All publications will filter the 
 *       Publication list
 *        on showing all publications.
 *     
 *     Important
 *       All publications will filter the 
 *       Publication list
 *        on only showing important publications.
 *     
 *     Casual
 *       All publications will filter the 
 *       Publication list
 *        on only showing casual publications.
 *   
 *   Endpoints available to implement the flow:
 *     InfoPanelPlayground.Publications.Publications.GetNumberOfActionsSuggested
 *       The following existing class is used for input:
 *       InfoPanelPlayground.Publications.Publications.CoreData.Empty
 *       The following existing class is used for output:: number
 *     
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

import React, { useEffect, useState } from 'react';
import { initializeDispatcher } from '../uniscale-session/dispatcher';
import { GetNumberOfActionsSuggested } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications_1_0/ServiceToModule/Publications/GetActionsSuggestedCountForBadge';
import { Empty } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications/CoreData';
import { PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications';

export default function TopBar({ onFilterChange, publications }: { onFilterChange: (filter: string) => void, publications: PublicationFull[] }) {
    const [actionsSuggested, setActionsSuggested] = useState<number>(0);
    const [selectedFilter, setSelectedFilter] = useState<string>('All');

    const getActionsCount = async () => {
        const dispatcher = await initializeDispatcher();
        const result = await dispatcher.request(GetNumberOfActionsSuggested.with(new Empty()))
        if (result.success && result.value) {
            setActionsSuggested(result.value);
        }
    }

    useEffect(() => {
        async function initialize() {
        }

        initialize();
    }, []);

    useEffect(() => {
        console.log('getting actions count');
        getActionsCount();
    }, [publications]);

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
        onFilterChange(filter);
    };

    const getButtonStyle = (filter: string) => ({
        backgroundColor: selectedFilter === filter ? '#FEF2EE' : 'transparent',
        color: selectedFilter === filter ? '#B36B55' : 'inherit',
        padding: '5px 10px',
        borderRadius: '10px'
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
                {actionsSuggested > 0 && (
                    <span className="badge" style={{ backgroundColor: '#ED7552', color: 'white', borderRadius: '10px', padding: '5px 10px' }}>
                        {actionsSuggested} Actions Suggested
                    </span>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flex: 2 }}>
                <button
                    style={getButtonStyle('All')}
                    onClick={() => handleFilterChange('All')}
                >
                    All publications
                </button>
                <button
                    style={getButtonStyle('Important')}
                    onClick={() => handleFilterChange('Important')}
                >
                    Important
                </button>
                <button
                    style={getButtonStyle('Casual')}
                    onClick={() => handleFilterChange('Casual')}
                >
                    Casual
                </button>
            </div>
        </div>
    );
}
