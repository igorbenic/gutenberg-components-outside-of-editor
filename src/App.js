import React from 'react';
import './App.scss';
import logo from './logo.png';
import { TabPanel, SlotFillProvider, Slot, Fill } from '@wordpress/components';
import ExampleForm from './components/ExampleForm';
import ExampleNotices from './components/ExampleNotices';
import ExampleUpload from './components/ExampleUpload';
import ExampleProfile from './components/ExampleProfile';

function RenderTab( tab ) {
  const tabs = AppTabs();
  let TabComponent = ExampleForm; // Default.
  for( let i = 0; i < tabs.length; i++ ) {
    let tabsItem = tabs[ i ];
    if ( tab.name === tabsItem.name ) {
      TabComponent = tabsItem.comp;
      break;
    }
  }

  return <Fill name="TabContentSlot"><TabComponent /></Fill>
}

function AppTabs() {
  return [
    {
      name: 'example1',
      title: 'Example Form',
      comp: ExampleForm
    },
    {
      name: 'example2',
      title: 'Example Notices',
      comp: ExampleNotices
    },
    {
      name: 'example3',
      title: 'Example Upload',
      comp: ExampleUpload
    },
    {
      name: 'example4',
      title: 'Example Profile',
      comp: ExampleProfile
    }
  ]
}

function App() {
  
  return (
      <SlotFillProvider>
        <div className="App">
          <header className="App-header">
            <img className="logo" src={logo} alt="logo" />
            <h1>Gutenberg Components outside of the Editor</h1>
            <h2>JavaScript for WordPress 2019</h2>
            
            <TabPanel className="my-tab-panel"
              activeClass="active-tab" 
              tabs={ AppTabs() }>
              { (tab) => RenderTab(tab) }
            </TabPanel>
          </header>
          <main>
            <Slot name="TabContentSlot"/>
          </main>
        </div>
      </SlotFillProvider>
  );
}

export default App;
