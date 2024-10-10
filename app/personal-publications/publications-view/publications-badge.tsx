import { PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications';
import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Avatar, Box, Chip } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import Person from '@mui/icons-material/Person';
import { userSession } from '@/app/user-session/user-session';
import { UserFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users/Users';
import { initializeDispatcher } from '@/app/uniscale-session/dispatcher';

/** 
 * Using the Uniscale SDK to call defined endpoints through a dispatcher session
 * Using the Uniscale dispatcher you can use the Request method in and pass an instance of a class based on the RequestResponseBackendAction
 * base class using the static .With method to set the input. What is passed into the .With. For the result class that comes back. If the Success property is true
 * it has succeeded and you will find the result is in the Value property. If the Success property is false it can use the .Error.Details.UserError
 * to get the error message. It should use the feature class directly as a static class when using the .With method.
 * 
 * Badge functionality
 *   
 *   There are 7 flows available in this use case:
 *     Border information
 *       When a badge is selected in the list it will show up with a red border as shown below. If the badge
 *       is not selected it will be shown with a grey border.
 *       
 *       Acceptance criteria:
 *         When a badge is selected in the list it will show up with a red border.
 *         If the badge is not selected it will be shown with a grey border.
 *     
 *     Left side colouring
 *       The left side colouring depends on both priority and it's actionable state. The colouring is as
 *       follows
 *       
 *        * Green - casual not actionable
 *        * Blue - important not actionable
 *        * Purple - actionable
 *     
 *     Title
 *       The title will display the publication title. If it exceeds the badge width it will wrap into
 *       multiple lines
 *     
 *     Author
 *       The author shows the department that has published it
 *     
 *     Time information
 *       The time information will show:
 *        * In hours if it's within the same day. 
 *        * In days if it's within the current month
 *        * In months if it's within the current year
 *        * Last year if it's from last year
 *        * In years if it's from before last year
 *     
 *     Short message
 *       The badge hight will be stretched to be able to contain the full short message text.
 *     
 *     Suggests action
 *       If the publication is marked as suggests action the suggests action badge should be shown
 * 
 */

interface PublicationsBadgeProps {
    publication: PublicationFull;
    isSelected: boolean;
    onClick: () => void;
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

export default function PublicationsBadge({ publication, isSelected, onClick }: PublicationsBadgeProps) {
    const [user, setUser] = React.useState<UserFull>();

    const getTimeSincePublished = () => {
        const now = new Date();
        const publishedDate = publication.publishedAt ? new Date(publication.publishedAt) : now;
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

    useEffect(() => {
        const initialize = async () => {
            const dispatcher = await initializeDispatcher();
            const user = (await userSession(dispatcher)).user;
            setUser(user)
        }
        initialize()
    }, []);

    return (
        <Card 
            variant="outlined" 
            sx={{ 
                borderColor: isSelected ? '#F6C0B0' : 'grey', 
                borderWidth: isSelected ? 2 : 1, 
                cursor: 'pointer',
                borderLeft: publication.publicationType === 'Important' ? '5px solid #5454FF' : 
                            publication.publicationType === 'Casual' ? '5px solid #0B850B' : 'none',
                borderRadius: publication.publicationType === 'Important' ? '5px 0 0 10px' : 'none'
            }} 
            onClick={onClick}
        >
            <CardContent>
                <Typography variant="h6" component="div">
                    {publication.title}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    <Avatar sx={{ bgcolor: 'lightgrey', mr: 1, height: 20, width: 20 }}>
                        <Person sx={{ fontSize: 20, color: 'white' }} />
                    </Avatar>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                        {publication.author}
                    </Typography>
                    <AccessTime fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        {getTimeSincePublished()}
                    </Typography>
                </Box>
                <Typography variant="body2" mt={1}>
                    {publication.shortMessage}
                </Typography>
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
                            }
                        }} 
                        icon={<ExclamationCircleIcon />}
                    />
                )}
            </CardContent>
        </Card>
    );
}
