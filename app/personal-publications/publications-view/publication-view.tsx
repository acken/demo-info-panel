/** 
 * Using the Uniscale SDK to call defined endpoints through a dispatcher session
 * Using the Uniscale dispatcher you can use the Request method in and pass an instance of a class based on the RequestResponseBackendAction
 * base class using the static .With method to set the input. What is passed into the .With. For the result class that comes back. If the Success property is true
 * it has succeeded and you will find the result is in the Value property. If the Success property is false it can use the .Error.Details.UserError
 * to get the error message. It should use the feature class directly as a static class when using the .With method.
 * 
 * View functionality
 *   
 *   There are 7 flows available in this use case:
 *     Title
 *       The title will display the publication title. If it exceeds the badge width it will wrap into
 *       multiple lines
 *     
 *     Author
 *       The author shows the department that has published it
 *     
 *     Published time
 *       The time information will show:
 *        * In hours if it's within the same day. 
 *        * In days if it's within the current month
 *        * In months if it's within the current year
 *        * Last year if it's from last year
 *        * In years if it's from before last year
 *     
 *     Short message
 *       Short message should be display above the body text
 *     
 *     Body text
 *       The body text should be rendered as rich text
 *     
 *     Actionable badge
 *       The actionable badge should be shown in front of the priority badge (pushing the priority badge to
 *       the right when shown). It should only be visible if the it is marked as actionable.
 *     
 *     Priority badge
 *       The priority should be shown as green if it is casual and as blue if it's important. If the
 *       actionable badge is visible the priority badge will be shifted towards the right so that it's next
 *       to it.
 * 
 */

import React from 'react';
import { Typography, Box, Badge, Avatar, Chip } from '@mui/material';
import Person from '@mui/icons-material/Person';
import { PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications';

interface PublicationViewProps {
    publication: PublicationFull | null;
}

function ExclamationCircleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#F19276" strokeWidth="2"/>
            <path d="M12 8V12" stroke="#F19276" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16H12.01" stroke="#F19276" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const PublicationView: React.FC<PublicationViewProps> = ({
    publication
}) => {
    const getTimeSincePublished = () => {
        const now = new Date();
        const publishedDate = publication?.publishedAt ? new Date(publication.publishedAt) : now;
        const diffInMs = now.getTime() - publishedDate.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return `${Math.floor(diffInHours)} hours ago`;
        } else if (diffInHours < 24 * 30) {
            return `${Math.floor(diffInHours / 24)} days ago`;
        } else if (diffInHours < 24 * 365) {
            return `${Math.floor(diffInHours / (24 * 30))} months ago`;
        } else if (publishedDate.getFullYear() === now.getFullYear() - 1) {
            return 'Last year';
        } else {
            return `${now.getFullYear() - publishedDate.getFullYear()} years ago`;
        }
    };

    if (!publication) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography variant="h6" color="textSecondary">
                    Please select a publication from the list to display it.
                </Typography>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" border={1} borderColor="lightgrey" pt={0} flexGrow={1} height="100%" minHeight="80vh">
            <Box maxWidth="500px" width="100%" pt={10} display="flex" flexDirection="column" height="100%">
                <Typography variant="h5">{publication.title}</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    <Avatar sx={{ bgcolor: 'lightgrey', mr: 1, height: 20, width: 20 }}>
                        <Person sx={{ fontSize: 20, color: 'white' }} />
                    </Avatar>
                    <Typography variant="body1" ml={1}>
                        {publication.author}
                    </Typography>
                    <Typography variant="body2" ml={2}>
                        {getTimeSincePublished()}
                    </Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                    {publication.shortMessage}
                </Typography>
                <Typography variant="body1" mt={1} flexGrow={1}>
                    {(publication.body ? publication.body : '').split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </Typography>
                <Box sx={{ mt: 3, paddingBottom: "20px" }}>
                    {publication.actionable && (
                        <Chip 
                        label="Suggests Action" 
                        color="error" 
                        sx={{ 
                            mt: 1, 
                            backgroundColor: '#FEF2EE', 
                            color: '#F19276',
                            padding: '10px',
                            '& .MuiChip-icon': {
                                color: '#F19276'
                            },
                            mr: 2 // Add margin-right to create space between the badges
                        }} 
                        icon={<ExclamationCircleIcon />}
                    />
                    )}
                    <Chip 
                        label={publication.publicationType}
                        sx={{ 
                            mt: 1, 
                            backgroundColor: publication.publicationType === 'Casual' ? '#0B850B' : '#5454FF', 
                            color: 'white',
                            padding: '10px',
                            '& .MuiChip-icon': {
                                color: '#F19276'
                            }
                        }} 
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PublicationView;
