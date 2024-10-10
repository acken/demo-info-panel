import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import PublicationsBadge from './publications-badge';
import { PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications';

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

interface PublicationsListProps {
    onTabChange: (tabIndex: string) => void;
    onPublicationSelected: (publication: PublicationFull | null) => void;
    publications: PublicationFull[];
}

export default function PublicationsList({ onTabChange, onPublicationSelected, publications }: PublicationsListProps) {
    const [publicationList, setPublicationList] = useState<PublicationFull[]>(publications);
    const [tabIndex, setTabIndex] = useState(0);
    const [selectedPublicationIdentifier, setSelectedPublicationIdentifier] = useState<string | null>(null);
    
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
        onTabChange(newValue == 0 ? 'ALL' : 'THIS_WEEK');
    };

    useEffect(() => {
        setPublicationList(publications);
        if (publications.length == 0) {
            setSelectedPublicationIdentifier(null);
            onPublicationSelected(null)
        } else {
            const firstPublication = publications[0];
            setSelectedPublicationIdentifier(firstPublication.publicationIdentifier as string);
            onPublicationSelected(firstPublication);
        }
    }, [publications]);

    return (
        <Box sx={{ border: 'none', borderRight: 'none', boxShadow: 'none' }}>
            <AppBar position="static" sx={{ backgroundColor: '#FAFAFA', boxShadow: 'none', borderRight: 'none' }}>
                <Tabs 
                    value={tabIndex} 
                    onChange={handleTabChange}
                    variant="fullWidth"
                    sx={{
                        '& .MuiTabs-indicator': {
                            display: 'none',
                        },
                        '& .MuiTab-root': {
                            borderRadius: '16px',
                            margin: '0 4px',
                            textTransform: 'none', // Disable uppercase
                            fontSize: 'inherit', // Use normal font size
                            '&.Mui-selected': {
                                backgroundColor: '#ED7552',
                                color: 'white',
                            },
                            '&:not(.Mui-selected)': {
                                backgroundColor: '#FAFAFA',
                                color: '#939393',
                            },
                        },
                    }}
                >
                    <Tab label="All posts" />
                    <Tab label="This week only" />
                </Tabs>
            </AppBar>
            <Box p={3}>
                {publicationList.length === 0 ? (
                    <Typography>No publications found</Typography>
                ) : (
                    publicationList.map((publication) => (
                        <Box key={publication.publicationIdentifier} pb={1}>
                            <PublicationsBadge 
                                publication={publication} 
                                isSelected={publication.publicationIdentifier == selectedPublicationIdentifier} 
                                onClick={function (): void {
                                    setSelectedPublicationIdentifier(publication.publicationIdentifier as string);
                                    onPublicationSelected(publication);
                                }} 
                            />
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    );
};
