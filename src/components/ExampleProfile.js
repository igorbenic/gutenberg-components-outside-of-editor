import React from 'react';
import { 
    DropZone,
    DropZoneProvider,
    Placeholder
} from '@wordpress/components';
import ExampleForm from './ExampleForm';
 
function ImagePreview( file ) {
    if ( ! file ) {
        return <Placeholder
		icon="format-image"
		label="Placeholder"
	/>;
    }

    if ( typeof file === 'string' ) {
        return <img src={ file } alt="Preview" />;
    }
    const url = URL.createObjectURL(file);
     
    return <img src={ url } alt='Preview' />
}

function ProfilePosition( position ) {
    if ( position ) {
        return <p>{ position }</p>;
    }
    return '';
}
function ProfileName( first_name, last_name ) {
    let name = [];
    if ( first_name ) {
        name.push( first_name );
    }
    if ( last_name ) {
        name.push( last_name );
    }

    if ( name.length ) {
        return <h2>{ name.join( ' ' ) }</h2>
    } else {
        return <h2>Enter your Name</h2>
    }
}

function ProfileAbout( about ) {
    if ( ! about ) {
        return '';
    }
    const string =  '<p>' + (about + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1</p><p>$2') + '</p>';
    return <div className="about" dangerouslySetInnerHTML={ {__html: string } }></div>
    //return <p>{ about }</p>
}

class ExampleProfile extends React.Component {
    constructor( props ) {
        super( props );
        this.state= { 
            first_name: '',
            last_name: '',
            position: '',
            image: null,
            about: ''
        }
        this.getFields = this.getFields.bind(this);
        this.clearState = this.clearState.bind(this);
    }
    clearState() {
        this.setState({ 
            first_name: '',
            last_name: '',
            position: '',
            image: null,
            about: ''
        });
    }
    getFields() {
        const fields = [
            {
                id: 'first_name',
                props: {
                    label: 'First Name',
                    type: 'text',
                    value: this.state.first_name ? this.state.first_name : '',
                    valueChange: ( value ) => {
                        this.setState({ first_name: value });
                    }
                },
                comp: 'TextControl'
            },
            {
                id: 'last_name',
                props: {
                    label: 'Last Name',
                    type: 'text',
                    value: this.state.last_name ? this.state.last_name : '',
                    valueChange: ( value ) => {
                        this.setState({ last_name: value });
                    }
                },
                comp: 'TextControl'
            },
            {
                id: 'position',
                props: {
                    label: 'Position',
                    type: 'text',
                    selected: this.state.position ? this.state.position : '',
                    valueChange: ( value ) => {
                        this.setState({ position: value });
                    },
                    options: [
                        { label: 'Plugin Developer', value: 'Plugin Developer' },
                        { label: 'Theme Developer', value: 'Theme Developer' },
                        { label: 'Software Engineer', value: 'Software Engineer' },
                        { label: 'Learning JavaScript', value: 'Learning Javascript' },
                    ]
                },
                comp: 'RadioControl'
            },
            {
                id: 'about',
                props: {
                    label: 'About',
                    value: this.state.about ? this.state.about : '',
                    valueChange: ( value ) => {
                        this.setState({ about: value });
                    }
                },
                comp: 'TextareaControl'
            },
       ];
       return fields;
    }

    render() {
        const { first_name, last_name, position, image, about } = this.state;
        const fields = this.getFields();
        return (
            <div className="profile">
                <div className="profile-container">
                    <div className="header">
                        <div className="image">
                            <DropZoneProvider>
                                <DropZone 
                                    onFilesDrop={ ( files ) => this.setState( { image: files[0]} ) }
                                />
                                { ImagePreview( image ) }
                            </DropZoneProvider>
                        </div>
                        <div className="name">
                            { ProfileName( first_name, last_name ) }
                            { ProfilePosition( position ) }
                        </div>
                    </div>
                     
                        { ProfileAbout( about ) }
                  
                </div>
                <ExampleForm passed_fields={ fields }
                    onSubmit={ () => { alert('Saving'); }}
                    onClear={ this.clearState }
                />
            </div>
        );
    }
}

export default ExampleProfile;
