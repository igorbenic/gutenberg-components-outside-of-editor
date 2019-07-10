import React, { useState } from 'react';
import { 
    FormFileUpload,
    DropZone,
    DropZoneProvider
} from '@wordpress/components';
import ExampleForm from './ExampleForm';
 
function ImagePreview( file ) {
    if ( ! file ) {
        return '';
    }

    if ( typeof file === 'string' ) {
        return <img src={ file } />;
    }
    const url = URL.createObjectURL(file);
     
    return <img src={ url } alt='Preview' />
}

function ExampleProfile() {
    const [ state, setState ] = useState({ 
        first_name: '', 
        loading:false,
    });

   const fields = [
        {
            id: 'first_name',
            props: {
                label: 'First Name',
                type: 'text',
                value: state.first_name ? state.first_name : '',
                valueChange: ( value ) => {
                    let objectValue = {};
                    objectValue[ 'first_name' ] = value;
                   
                    setState({
                        ...state,
                        ...objectValue
                    });
                }
            },
            comp: 'TextControl'
        }
   ];

  return (<div className="profile">
     <ExampleForm passed_fields={ fields }
        onSubmit={ () => { alert('Submitted');}}
     />
  </div>);
}

export default ExampleProfile;
