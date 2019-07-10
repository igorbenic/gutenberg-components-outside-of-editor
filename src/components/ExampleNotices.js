import React, { useState } from 'react';
import {
    NoticeList,
    SnackbarList,
    Button
} from '@wordpress/components';


function ExampleNotices() {
    const [ state, setState ] = useState({ 
        notices: [], 
        snackbars: []
    });
  return (<div className="notices">
        <div className="notice-actions">
            <Button isPrimary onClick={() => {
                var notice = { 
                    id: 'notice',
                    content: 'Notice',
                    status: 'success' 
                };
                let notices = state.notices;
                notices.push( notice );
                setState( { ...state, ...{ notices: notices } } );
            }}>Success Notice</Button>

            <Button isPrimary onClick={() => {
                var notice = { 
                    id: 'notice_error',
                    content: 'Error Notice',
                    status: 'error' 
                };
                let notices = state.notices;
                notices.push( notice );
                setState( { ...state, ...{ notices: notices } } );
            }}>Error Notice</Button>

            <Button isPrimary onClick={() => {
                var notice = { 
                    id: 'notice_info',
                    content: 'Info Notice',
                    status: 'info' 
                };
                let notices = state.notices;
                notices.push( notice );
                setState( { ...state, ...{ notices: notices } } );
            }}>Info Notice</Button>

            <Button isPrimary onClick={() => {
                var notice = { 
                    id: 'notice_warning',
                    content: 'Warning Notice',
                    status: 'warning',
                    actions: [
                        {
                            label: 'Alert',
                            onClick: () => { alert('aha'); }
                        },
                        {
                            label: 'Link',
                            url: 'https://ibenic.com'
                        }
                    ]
                };
                let notices = state.notices;
                notices.push( notice );
                setState( { ...state, ...{ notices: notices } } );
            }}>Warning Notice</Button>

            <Button isPrimary onClick={() => {
                var notice = { 
                    id: 'notice_warning',
                    content: 'Snackbar',
                    status: 'warning'
                    
                };
                let notices = state.snackbars;
                notices.push( notice );
                setState( { ...state, ...{ snackbars: notices } } );
            }}>Snackbar</Button>
        </div>
    
        <NoticeList
		    notices={ state.notices }
		/>
        <SnackbarList
			notices={ state.snackbars }
		/>
        
  </div>);
}

export default ExampleNotices;
