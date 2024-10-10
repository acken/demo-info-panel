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
 *     Welcome information
 *       The welcome banner is there to set the stage for the user on what to expect within this view. The
 *       first name should come from the first name in their Google profile.
 *       
 *       Acceptance criteria: The first name displayed in the welcome banner should come from the user's
 *       Google profile.
 *     
 *     Actionable filter
 *       The actionable filter will affect the 
 *       Publications list
 *        and will filter the list on only publications that are marked as actionable. The filter will be
 *       applied on top of already selected priority and any active search.
 *     
 *     Publications search
 *       The search will affect the 
 *       Publications list
 *        and will do a free text search within the title, short message and body text. The search will be
 *       applied on top of already selected priority and actionable filters.
 *     
 *     Create publication
 *       The create publications button will only be shown if the user has publisher or admin rights. When
 *       clicked it will open the create publication view.
 *       
 *       Acceptance criteria: The create publications button should only be shown if the user has publisher
 *       or admin rights.
 *   
 *   Endpoints available to implement the flow:
 *     InfoPanelPlayground.Users.Users.CurrentSession.GetCurrentUser
 *       The following existing class is used for input:
 *       InfoPanelPlayground.Users.Users.CoreContracts.Empty
 *       The following existing class is used for output:
 *       InfoPanelPlayground.Users.Users.UserFull
 *         name: string
 *         # The permission property is a Terminology (id: 8e284b8b-1bad-4fed-a52c-94e295f4850f) with the following codes:
 *         #   Viewer - Viewer
 *         #   Admin - Admin
 *         #   Publisher - Publisher
 *         permission: string
 *         joinedAt: Date
 *         profilePicture: string
 *         # The departments property is a Terminology (id: 5ef578c6-2271-4073-9717-b2344c6a39ee) with the following codes:
 *         #   HR - HR
 *         #   CX - Customer care
 *         #   Development - Development
 *         #   Sales - Sales
 *         #   Infrastructure - IT infrastructure
 *         #   Management - Management
 *         #   Product - Product
 *         departments: string[]
 *         userIdentifier: string
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

import CreatePublicationDialogue from '@/app/publishing/create-publication-dialogue';
import { initializeDispatcher } from '@/app/uniscale-session/dispatcher';
import { userSession } from '@/app/user-session/user-session';
import { PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications';
import React, { useEffect, useState } from 'react';

interface WelcomeToolbarProps {
    onFilterChange: (isActionable: boolean) => void;
    onSearchChange: (searchQuery: string) => void;
    onNewPublication: (publication: PublicationFull) => void;
}

export default function WelcomeToolbar({ onFilterChange, onSearchChange, onNewPublication }: WelcomeToolbarProps) {
    const [userName, setUserName] = useState('');
    const [isActionable, setIsActionable] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [hasPublishRights, setHasPublishRights] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    useEffect(() => {
        async function fetchUserData() {
            const dispatcher = await initializeDispatcher();
            const user = (await userSession(dispatcher)).user;
            setUserName(user.name ?? '');
            setHasPublishRights(user.permission === 'Admin' || user.permission === 'Publisher');
        }

        fetchUserData();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <div style={{ fontSize: '20px' }}>
                        Welcome back, {userName} 🙌
                    </div>
                    <div style={{ fontSize: '14px', marginTop: '0px' }}>
                        View your latest posts and activities
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>
                        <input
                            type="checkbox"
                            checked={isActionable}
                            style={{ marginRight: '5px' }}
                            onChange={(e) => {
                                onFilterChange(e.target.checked)
                                setIsActionable(e.target.checked)
                            }}
                        />
                        Only actionable
                    </label>
                    <div style={{ position: 'relative', marginRight: '10px' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => {
                                onSearchChange(e.target.value)
                                setSearchQuery(e.target.value)
                            }}
                            style={{ 
                                padding: '5px 30px 5px 10px', 
                                border: '1px solid #ccc', 
                                borderRadius: '4px' 
                            }}
                        />
                        <span style={{ 
                            position: 'absolute', 
                            right: '10px', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            pointerEvents: 'none',
                            color: 'grey'
                        }}>
                            ⌕
                        </span>
                    </div>
                    {hasPublishRights && (
                        <button 
                            onClick={() => setIsCreateDialogOpen(true)}
                            style={{ 
                                backgroundColor: '#ED7552', 
                                color: 'white', 
                                borderRadius: '5px', 
                                padding: '3px',
                                paddingLeft: '10px',
                                paddingRight: '10px'
                            }}
                        >
                            Create publication
                        </button>
                    )}
                </div>
            </div> 
            {isCreateDialogOpen && (
                <CreatePublicationDialogue 
                    onPost={(publication) => {
                        onNewPublication(publication);
                    }}
                    onClose={() => setIsCreateDialogOpen(false)}
                />
            )}
        </div>
    );
}
