import { profile } from 'console';
import React from 'react';
import { Grid, Header, Input, Placeholder } from 'semantic-ui-react';
import { Profile } from '../../models/profile';
import MyTextInput from '../form/MyTextInput';

interface Props {
    profile : Profile;
}

export default function EditProfileWidget({profile}: Props){
    return(
        <Grid>
            <Grid.Column width={4}>
                <Header color='teal' content='Editing Profile' textAlign='center'/>
                <Input  placeholder='DisplayName'/>
            </Grid.Column>
        </Grid>
    )
}