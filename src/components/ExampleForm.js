import React, { useState } from 'react';
import { Button, TextControl, TextareaControl, RadioControl, CheckboxControl, SelectControl } from '@wordpress/components';

function getFields( state ) {
    return [
        {
            id: 'name',
            props: {
                label: 'Name',
                type: 'text',
                value: state ? state.name || '' : ''
            },
            comp: TextControl
        },
        {
            id: 'about',
            props: {
                label: 'About',
                value: state ? state.about || '' : ''
            },
            comp: TextareaControl
        },
        {
            id: 'rate',
            props: {
                label: 'Rate',
                selected: state ? state.rate || '1' : '1',
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
                selected: state ? state.country || 'green' : 'green',
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
                checked: state ? state.terms || false : false,
                
            },
            comp: CheckboxControl
        }
    ];
}

function ExampleForm() {
  const [ state, setState ] = useState({});
  const fields = getFields( state );
 
  return (<form>
        { 
            fields.length && fields.map( ( item, i  ) => {
   
                return <div key={i} className="field">
                    <item.comp { ...item.props } onChange={ 
                        ( value ) => {
                            let objectValue = {};
                            objectValue[ item.id ] = value;
                            setState({
                                ...state,
                                ...objectValue
                            });
                        }} />
                </div>;
            })
        }
        <Button isPrimary>Submit</Button>
  </form>);
}

export default ExampleForm;
