import { appmaker } from '@appmaker-xyz/core';

function OPEN_WHATMORE_SHOPPABLE(
    { action, params },
    { handleAction, appStorageState },
  ) {
      // handleAction({
      //   action: "OPEN_INAPP_PAGE",
      //   pageId: 'reelpage',
      // })
    // alert('hello')
    }
  
  export function registerActions() {
    appmaker.actions.registerAction('OPEN_WHATMORE_SHOPPABLE', OPEN_WHATMORE_SHOPPABLE);
  }