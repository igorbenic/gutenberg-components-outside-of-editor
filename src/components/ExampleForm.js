import React, { useState } from 'react';
import { 
    Button, 
    TextControl, 
    TextareaControl, 
    RadioControl, 
    CheckboxControl, 
    SelectControl
} from '@wordpress/components';

function getComponent( comp ) {
    const components = {
        'TextControl': TextControl,
        'TextareaControl': TextareaControl,
        'RadioControl': RadioControl,
        'CheckboxControl': CheckboxControl,
        'SelectControl': SelectControl,
    }
    return components[ comp ] ? components[ comp ] : TextControl;
}

function getFields( state ) {
    const fields = state.fields;
    return [
        {
            id: 'name',
            props: {
                label: 'Name',
                type: 'text',
                value: fields ? fields.name || '' : ''
            },
            comp: 'TextControl'
        },
        {
            id: 'about',
            props: {
                label: 'About',
                value: fields ? fields.about || '' : ''
            },
            comp: 'TextareaControl'
        },
        {
            id: 'rate',
            props: {
                label: 'Rate',
                selected: fields ? fields.rate || '1' : '1',
                options: [
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                ]
                
            },
            comp: 'RadioControl'
        },
        {
            id: 'color',
            props: {
                label: 'Color',
                selected: fields ? fields.color || 'green' : 'green',
                options: [
                    { label: 'Green', value: 'green' },
                    { label: 'Blue', value: 'blue' },
                    { label: 'Red', value: 'red' }
                ]
                
            },
            comp: 'SelectControl'
        },
        {
            id: 'terms',
            props: {
                label: 'Terms',
                checked: fields ? fields.terms || false : false,
                
            },
            comp: 'CheckboxControl'
        }
    ];
}

function ExampleForm( { passed_fields = false, onSubmit, onClear }) {
  const [ state, setState ] = useState({ 
      fields: {}, 
      loading:false,
  });
   
  const fields = passed_fields ? passed_fields : getFields( state );
 
  return (<form>
        { 
            fields.length && fields.map( ( item, i  ) => {
                var Component = getComponent( item.comp );
                var props     = item.props;
                var changeVal = item.props.valueChange;
                delete props['valueChange'];
                return <div key={i} className="field">
                    <Component { ...item.props } onChange={ 
                        ( value ) => {
                            if ( changeVal ) {
                                changeVal( value )
                            } else {
                                let objectValue = {};
                                objectValue[ item.id ] = value;
                                const fields = { ...state.fields, ...objectValue };
                    
                                setState({
                                    ...state,
                                    ...{ fields: fields }
                                });
                            }
                        }} />
                </div>;
            })
        }
        <div className="form-actions">
            <Button 
                isPrimary
                focus={ 'undefined' }
                onClick={ () => { if ( onSubmit ) { onSubmit(); } else { setState( { loading:true } ) } } }
                isBusy={ state.loading }>
                Submit
            </Button>

            <Button isDefault onClick={ () => {
                if ( onClear ) {
                    onClear();
                } else {
                    setState({ fields: {} });
                }
            }}>Clear</Button>
        </div>
  </form>);
}

export default ExampleForm;
