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
    const url = URL.createObjectURL(file);
    return <img src={ url } alt='Preview' />
}
function ExampleUpload() {
    const [ state, setState ] = useState({ 
        file: null
    });
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
