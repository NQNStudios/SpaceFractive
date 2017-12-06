'use babel';

import FractiveEditorView from './fractive-editor-view';
import { CompositeDisposable } from 'atom';

export default {

  fractiveEditorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fractiveEditorView = new FractiveEditorView(state.fractiveEditorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fractiveEditorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fractive-editor:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fractiveEditorView.destroy();
  },

  serialize() {
    return {
      fractiveEditorViewState: this.fractiveEditorView.serialize()
    };
  },

  toggle() {
    console.log('FractiveEditor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
