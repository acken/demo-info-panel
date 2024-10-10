/** 
 * Using the Uniscale SDK to call defined endpoints through a dispatcher session
 * Using the Uniscale dispatcher you can use the Request method in and pass an instance of a class based on the RequestResponseBackendAction
 * base class using the static .With method to set the input. What is passed into the .With. For the result class that comes back. If the Success property is true
 * it has succeeded and you will find the result is in the Value property. If the Success property is false it can use the .Error.Details.UserError
 * to get the error message. It should use the feature class directly as a static class when using the .With method.
 * 
 * View functionality
 *   
 *   There are 9 flows available in this use case:
 *     Title
 *       The publication title is required and cannot be more than 60 characters long. When the user tries
 *       to type more than 60 characters the user interface will not accept the typed letters.
 *       
 *       Acceptance criteria:
 *         The publication title is required.
 *         The user interface will not accept more than 60 characters when typed.
 *     
 *     Author
 *       Since a publisher can be part of multiple departments the publisher needs to select a department to
 *       publish from. If the user only has access to one department that one will be preselected. If the
 *       user has access to multiple non-will be selected and the user will have to make an explicit choice
 *       of which one to publish from. An author is required to be allowed to post the publication.
 *       
 *       Acceptance criteria:
 *         The publisher needs to select a department to publish from.
 *         If the user has access to only one department, it will be preselected.
 *         If the user has access to multiple departments, none will be selected, and the user will have to
 *         make an explicit choice of which one to publish from.
 *     
 *     Publication type
 *       A publication type is required and the user can select between Important and Casual. By default
 *       none is selected so that the publisher must make an explicit choice.
 *       
 *       Acceptance criteria:
 *         The publication type selection must default to 'none' until the user explicitly chooses between
 *         'Important' and 'Casual'.
 *         The publication type is required for the user to be allowed to post the publication
 *     
 *     Target departments
 *       The user may select 0 or more target departments. If no target departments are selected it will be
 *       available for all. If one or more target departments are selected it will only be available to
 *       users that have access to those departments.
 *       
 *       Acceptance criteria:
 *         - If no target departments are selected it will be available for all.
 *         - If one or more target departments are selected it will only be available to users that have
 *         access to those departments.
 *     
 *     Short message
 *       The short message is limited to 100 characters. When the publisher have reached a 100 characters
 *       the UI will not allow any more characters to be typed. The short message is required.
 *       
 *       Acceptance criteria:
 *         The short message is required.
 *         When the publisher reaches 100 characters, the UI should not allow any more characters to be typed.
 *     
 *     Body text
 *       The body text is optional and allows the user to use a limited set of rich text features. The
 *       accessible set of features are:
 *        * Bold
 *        * Italic
 *        * Strike through
 *        * URL's 
 *        * Dotted lists
 *        * Numbered lists
 *        * Tab in / tab back
 *        * Undo
 *        * Redo
 *     
 *     Suggest as action
 *       By default suggest as action should be off. This is only turned on by the publisher if they thinks
 *       that the target departments should treat the content of the publications as something that they
 *       should follow up on.
 *     
 *     Discard publication
 *       When discarding the publication the user should be prompted to whether or not they want to discard
 *       it if there is a short message or a body typed in. The same behaviour should be applied if the user
 *       clicks the Close button at the top of the dialogue or uses the Esc key on the keyboard.
 *       
 *       Acceptance criteria:
 *         The user should be prompted to confirm discarding the publication if there is a short message or
 *         body typed in
 *         The same prompt should appear if the user clicks the Close button or uses the Esc key
 *     
 *     Post publication
 *       When posting a publication it must have a title, author, publication type and a short message.
 *       
 *       Acceptance criteria:
 *         All required fields must be filled out
 *         After posting the publication the view should close and if the publication is included in the users
 *         current filter it should show up automatically in the UI
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
 *     InfoPanelPlayground.Publications.Publications.NewPublication
 *       The following existing class is used for input:
 *       InfoPanelPlayground.Publications.Publications.EndpointContracts.NewPublicationInput
 *         # The publicationType property is a Terminology (id: 5401420b-cee3-4455-8044-c2f8fc046e06) with the following codes:
 *         #   Casual - Casual
 *         #   Important - Important
 *         publicationType: string
 *         body: string
 *         shortMessage: string
 *         actionable: boolean
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
import { Terminologies as PublicationsTerminologies } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications_1_0';
import { Terminologies as AuthorTerminologies } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Users_1_0';
import { userSession } from '../user-session/user-session';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Checkbox, FormControlLabel, Typography, Box } from '@mui/material';
import { DispatcherSession, ITerminologyCode } from '@uniscale-sdk/ActorCharacter-InfoPanel';
import { NewPublication } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications_1_0/ServiceToModule/Publications/PostPublication';
import { PublicationFull } from '@uniscale-sdk/ActorCharacter-InfoPanel/sdk/InfoPanelPlayground/Publications/Publications';

interface CreatePublicationDialogueProps {
    onClose: () => void;
    onPost: (newPublication: PublicationFull) => void; // Add this line
}

const CreatePublicationDialogue: React.FC<CreatePublicationDialogueProps> = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [postType, setPostType] = useState('');
    const [targetDepartments, setTargetDepartments] = useState<string[]>([]);
    const [shortMessage, setShortMessage] = useState('');
    const [body, setBody] = useState('');
    const [suggestAsAction, setSuggestAsAction] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [authorOptions, setAuthorOptions] = useState<string[]>([]);
    const [postTypeOptions, setPostTypeOptions] = useState<string[]>([]);
    const [targetDepartmentOptions, setTargetDepartmentOptions] = useState<string[]>([]);
    const [dispatcher, setDispatcher] = useState<DispatcherSession>();

    const handleDiscard = () => {
        if (props.onClose) {
            props.onClose();
        }
    }

    const handlePost = async () => {
        if (!dispatcher) return;

        const newPublicationInput = {
            title,
            author,
            publicationType: postType,
            targetDepartments,
            shortMessage,
            body,
            actionable: suggestAsAction,
        };

        const result = await dispatcher.request(NewPublication.with(newPublicationInput));

        if (result.success) {
            const newPublication = result.value;
            if (props.onPost && newPublication) {
                props.onPost(newPublication);
            }
            handleDiscard();
        } else {
            const userError = result.error?.details?.userError;
            const technicalError = result.error?.details?.technicalError;
            setError(userError || technicalError || 'An unknown error occurred.');
        }
    };

    useEffect(() => {
        const initialize = async () => {
            const dispatcher = await initializeDispatcher();
            setDispatcher(dispatcher);
            const user = (await userSession(dispatcher)).user;
            setAuthorOptions(user.departments || []);
            const postTypes = await dispatcher
                .getTerminology(PublicationsTerminologies.publications.coreData.publicationType.id);
            if (postTypes.success)
                if (Array.isArray(postTypes.value)) {
                    setPostTypeOptions(postTypes.value.map((code: ITerminologyCode) => code.code));
                }
            const targetDepartments = await dispatcher
                .getTerminology(AuthorTerminologies.users.access.department.id);
            if (targetDepartments.success)
                if (Array.isArray(targetDepartments.value)) {
                    setTargetDepartmentOptions(targetDepartments.value.map((code: ITerminologyCode) => code.code));
                }
        };
        initialize();
    }, []);

    return (
        <Box
            className="create-publication-dialogue"
            p={2}
            sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                boxShadow: 24,
                zIndex: 1300,
                width: '80%',
                maxWidth: '600px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Typography variant="h5">Create publication</Typography>
            {error && (
                <Typography variant="subtitle1" color="error" sx={{ marginBottom: '4px' }}>
                    {error}
                </Typography>
            )}
            <Typography variant="subtitle1" sx={{ marginTop: '4px' }}>Title</Typography>
            <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="none"
                inputProps={{ maxLength: 60 }}
                size="small"
            />
            <Box display="flex" justifyContent="space-between">
                <FormControl fullWidth margin="normal" sx={{ mr: 1 }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: '4px' }}>Author</Typography>
                    <Select
                        value={author}
                        onChange={(e) => setAuthor(e.target.value as string)}
                        sx={{ height: '30px' }}
                    >
                        {authorOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" sx={{ ml: 1 }}>
                    <Typography variant="subtitle1" sx={{ marginBottom: '4px' }}>Post Type</Typography>
                    <Select
                        value={postType}
                        onChange={(e) => setPostType(e.target.value as string)}
                        sx={{ height: '30px' }}
                    >
                        {postTypeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <FormControl fullWidth margin="normal">
                <Typography variant="subtitle1" sx={{ marginBottom: '4px' }}>Target Departments</Typography>
                <Select
                    multiple
                    value={targetDepartments}
                    onChange={(e) => setTargetDepartments(e.target.value as string[])}
                    renderValue={(selected) => selected.join(', ')}
                    sx={{ height: '30px' }}
                >
                    {targetDepartmentOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={targetDepartments.indexOf(option) > -1} />
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="subtitle1" sx={{ marginTop: '15px' }}>Short Message</Typography>
            <TextField
                value={shortMessage}
                onChange={(e) => setShortMessage(e.target.value)}
                fullWidth
                margin="none"
                inputProps={{ maxLength: 100 }}
                size="small"
            />
            <Typography variant="subtitle1" sx={{ marginTop: '20px' }}>Body</Typography>
            <TextField
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
                margin="none"
                multiline
                rows={4}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={suggestAsAction}
                        onChange={(e) => setSuggestAsAction(e.target.checked)}
                    />
                }
                label="Suggest as action"
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="outlined" onClick={handleDiscard}>
                    Discard Publication
                </Button>
                <Button variant="contained" color="primary" onClick={handlePost}>
                    Post Publication
                </Button>
            </Box>
        </Box>
    );
}

export default CreatePublicationDialogue;