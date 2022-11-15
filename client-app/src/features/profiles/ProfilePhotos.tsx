import { observer } from 'mobx-react-lite';
import React from 'react';
import { Card, Header, Image, Tab, TabPane } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';

interface Props {
    profile:Profile;
}

export default observer(function ProfilePhotos({profile}: Props) {

    return(
        <Tab.Pane>
            <Header icon='image' content='Photos' />
            <Card.Group itemsPerRow={5}>
                {profile.photos?.map(photo => (
                <Card>
                    <Image src={'/assets/user.png'}/>
                </Card>
                ))}
                
                <Card>
                    <Image src={'/assets/user.png'}/>
                </Card>
                <Card>
                    <Image src={'/assets/user.png'}/>
                </Card>
            </Card.Group>
        </Tab.Pane>
    )

})