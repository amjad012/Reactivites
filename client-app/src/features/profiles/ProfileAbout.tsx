import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Card, Grid, Header, Icon, Item, Segment, Tab, TabPane } from 'semantic-ui-react';
import EditProfileWidget from '../../app/common/editProfile/EditProfileWidget';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';


interface Props {
    profile : Profile;
}

export default observer (function ProfileAbout({profile}: Props) {
    const{profileStore:{isCurrentUser}} = useStore();
    const[editProfileMode, setEditProfileMode] = useState(false);
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>                   
                <Header icon='user' as='h3'content={'About ' + profile.displayName}/>
                {/* {isCurrentUser} */}
                <Button floated='right' basic 
                    content={editProfileMode ?'Cancel' : 'Edit Profile'}
                    onClick={() => setEditProfileMode(!editProfileMode)}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    {editProfileMode? (
                        <EditProfileWidget profile={profile} />

                    ) : (
                        <Card.Group>
                            
                        </Card.Group>
                    )
                }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
        
    )
})