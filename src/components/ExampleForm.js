import React, { useState } from 'react';
import { 
    Button, 
    TextControl, 
    TextareaControl, 
    RadioControl, 
    CheckboxControl, 
    SelectControl 
} from '@wordpress/components';

function getFields( state ) {
    const fields = state.fields;
    return [
        {
            id: 'name',
            props: {
                label: 'Name',
                type: 'text',
                value: state ? fields.name || '' : ''
            },
            comp: TextControl
        },
        {
            id: 'about',
            props: {
                label: 'About',
                value: state ? fields.about || '' : ''
            },
            comp: TextareaControl
        },
        {
            id: 'rate',
            props: {
                label: 'Rate',
                selected: state ? fields.rate || '1' : '1',
                options: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                ]
                
            },
            comp: RadioControl
        },
        {
            id: 'color',
            props: {
                label: 'Color',
                selected: state ? fields.color || 'green' : 'green',
                options: [
                    { label: 'Green', value: 'green' },
                    { label: 'Blue', value: 'blue' },
                    { label: 'Red', value: 'red' }
                ]
                
            },
            comp: SelectControl
        },
        {
            id: 'terms',
            props: {
                label: 'Terms',
                checked: state ? fields.terms || false : false,
                
            },
            comp: CheckboxControl
        }
    ];
}

function ExampleForm() {
  const [ state, setState ] = useState({ 
      fields: {}, 
      loading:false,
  });
  const fields = getFields( state );
 
  return (<form>
        { 
            fields.length && fields.map( ( item, i  ) => {
   
                return <div key={i} className="field">
                    <item.comp { ...item.props } onChange={ 
                        ( value ) => {
                            let objectValue = {};
                            objectValue[ item.id ] = value;
                            const fields = { ...state.fields, ...objectValue };
                
                            setState({
                                ...state,
                                ...{ fields: fields }
                            });
                        }} />
                </div>;
            })
        }
        <div className="form-actions">
            <Button 
                isPrimary
                focus={ 'undefined' }
                onClick={ () => { setState( { loading:true } ) } }
                isBusy={ state.loading }>
                Submit
            </Button>

            <Button isDefault onClick={ () => setState({ fields: {} })}>Clear</Button>
        </div>
  </form>);
}

export default ExampleForm;
