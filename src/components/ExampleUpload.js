import React, { useState } from 'react';
import { 
    FormFileUpload,
    DropZone,
    DropZoneProvider
} from '@wordpress/components';
 

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

function ExampleUpload() {
    const [ state, setState ] = useState({ 
        file: null
    });
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('image');

    if ( file && null === state.file ) {
        setState( { file: file });
    }

  return (<div className="upload">
    <DropZoneProvider>
        <FormFileUpload
		accept="image/*"
        icon='format-image'
		onChange={ ( e ) => setState( { file: e.target.files[0]} ) }
	    >
		Select an Image or Drop it here
	    </FormFileUpload>
        
            <DropZone 
                onFilesDrop={ ( files ) => setState( { file: files[0]} ) }
            />

        { ImagePreview( state.file ) }
        </DropZoneProvider>
  </div>);
}

export default ExampleUpload;
