import { Component, Input, Output, NgZone, EventEmitter, forwardRef, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
/**
 * Basic typings for the CKEditor5 elements.
 */
var CKEditor5;
(function (CKEditor5) {
    /**
     * The CKEditor5 editor constructor.
     * @record
     */
    function EditorConstructor() { }
    CKEditor5.EditorConstructor = EditorConstructor;
    /**
     * The CKEditor5 editor config.
     * @record
     */
    function Config() { }
    CKEditor5.Config = Config;
    /**
     * The event object passed to CKEditor5 event callbacks.
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_utils_eventinfo-EventInfo.html
     * @record
     * @template EventName
     */
    function EventInfo() { }
    CKEditor5.EventInfo = EventInfo;
    /**
     * The base Editor class.
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html
     * @record
     */
    function BaseEditor() { }
    CKEditor5.BaseEditor = BaseEditor;
    /**
     * The CKEditor5 DataApi interface.
     *
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_utils_dataapimixin-DataApi.html.
     * @record
     */
    function DataApi() { }
    CKEditor5.DataApi = DataApi;
    /**
     * A CKEditor5 editor that implements the
     * [DataApi interface](https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_utils_dataapimixin-DataApi.html).
     * E.g. the `ClassicEditor`, `InlineEditor`, etc.
     * @record
     */
    function Editor() { }
    CKEditor5.Editor = Editor;
})(CKEditor5 || (CKEditor5 = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CKEditorComponent {
    /**
     * @param {?} elementRef
     * @param {?} ngZone
     */
    constructor(elementRef, ngZone) {
        /**
         * The configuration of the editor.
         * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
         * to learn more.
         */
        this.config = {};
        /**
         * The initial data of the editor. Useful when not using the ngModel.
         * See https://angular.io/api/forms/NgModel to learn more.
         */
        this.data = '';
        /**
         * Tag name of the editor component.
         *
         * The default tag is 'div'.
         */
        this.tagName = 'div';
        /**
         * Fires when the editor is ready. It corresponds with the `editor#ready`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#event-ready
         * event.
         */
        this.ready = new EventEmitter();
        /**
         * Fires when the content of the editor has changed. It corresponds with the `editor.model.document#change`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_document-Document.html#event-change
         * event.
         */
        this.change = new EventEmitter();
        /**
         * Fires when the editing view of the editor is blurred. It corresponds with the `editor.editing.view.document#blur`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:blur
         * event.
         */
        this.blur = new EventEmitter();
        /**
         * Fires when the editing view of the editor is focused. It corresponds with the `editor.editing.view.document#focus`
         * https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_view_document-Document.html#event-event:focus
         * event.
         */
        this.focus = new EventEmitter();
        /**
         * The instance of the editor created by this component.
         */
        this.editorInstance = null;
        /**
         * If the component is read–only before the editor instance is created, it remembers that state,
         * so the editor can become read–only once it is ready.
         */
        this.initialIsDisabled = false;
        /**
         * A lock flag preventing from calling the `cvaOnChange()` during setting editor data.
         */
        this.isEditorSettingData = false;
        this.ngZone = ngZone;
        this.elementRef = elementRef;
    }
    /**
     * When set `true`, the editor becomes read-only.
     * See https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editor-Editor.html#member-isReadOnly
     * to learn more.
     * @param {?} isDisabled
     * @return {?}
     */
    set disabled(isDisabled) {
        this.setDisabledState(isDisabled);
    }
    /**
     * @return {?}
     */
    get disabled() {
        if (this.editorInstance) {
            return this.editorInstance.isReadOnly;
        }
        return this.initialIsDisabled;
    }
    // Implementing the AfterViewInit interface.
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            this.createEditor();
        }));
    }
    // Implementing the OnDestroy interface.
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.editorInstance) {
            this.editorInstance.destroy();
            this.editorInstance = null;
        }
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        // This method is called with the `null` value when the form resets.
        // A component's responsibility is to restore to the initial state.
        if (value === null) {
            value = '';
        }
        // If already initialized.
        if (this.editorInstance) {
            // The lock mechanism prevents from calling `cvaOnChange()` during changing
            // the editor state. See #139
            this.isEditorSettingData = true;
            this.editorInstance.setData(value);
            this.isEditorSettingData = false;
        }
        // If not, wait for it to be ready; store the data.
        else {
            this.data = value;
            // If the editor element is already available, then update its content.
            // If the ngModel is used then the editor element should be updated directly here.
            if (this.editorElement) {
                this.editorElement.innerHTML = this.data;
            }
        }
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} callback
     * @return {?}
     */
    registerOnChange(callback) {
        this.cvaOnChange = callback;
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} callback
     * @return {?}
     */
    registerOnTouched(callback) {
        this.cvaOnTouched = callback;
    }
    // Implementing the ControlValueAccessor interface (only when binding to ngModel).
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        // If already initialized
        if (this.editorInstance) {
            this.editorInstance.isReadOnly = isDisabled;
        }
        // If not, wait for it to be ready; store the state.
        else {
            this.initialIsDisabled = isDisabled;
        }
    }
    /**
     * Creates the editor instance, sets initial editor data, then integrates
     * the editor with the Angular component. This method does not use the `editor.setData()`
     * because of the issue in the collaboration mode (#6).
     * @private
     * @return {?}
     */
    createEditor() {
        /** @type {?} */
        const element = document.createElement(this.tagName);
        this.editorElement = element;
        if (this.data && this.config.initialData) {
            throw new Error('Editor data should be provided either using `config.initialData` or `data` properties.');
        }
        // Merge two possible ways of providing data into the `config.initialData` field.
        /** @type {?} */
        const config = Object.assign({}, this.config, { initialData: this.config.initialData || this.data || '' });
        this.elementRef.nativeElement.appendChild(element);
        return (/** @type {?} */ (this.editor)).create(element, config)
            .then((/**
         * @param {?} editor
         * @return {?}
         */
        editor => {
            this.editorInstance = editor;
            if (this.initialIsDisabled) {
                editor.isReadOnly = this.initialIsDisabled;
            }
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                this.ready.emit(editor);
            }));
            this.setUpEditorEvents(editor);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            console.error(err.stack);
        }));
    }
    /**
     * Integrates the editor with the component by attaching related event listeners.
     * @private
     * @param {?} editor
     * @return {?}
     */
    setUpEditorEvents(editor) {
        /** @type {?} */
        const modelDocument = editor.model.document;
        /** @type {?} */
        const viewDocument = editor.editing.view.document;
        modelDocument.on('change:data', (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                if (this.cvaOnChange && !this.isEditorSettingData) {
                    /** @type {?} */
                    const data = editor.getData();
                    this.cvaOnChange(data);
                }
                this.change.emit({ event: evt, editor });
            }));
        }));
        viewDocument.on('focus', (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                this.focus.emit({ event: evt, editor });
            }));
        }));
        viewDocument.on('blur', (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => {
                if (this.cvaOnTouched) {
                    this.cvaOnTouched();
                }
                this.blur.emit({ event: evt, editor });
            }));
        }));
    }
}
CKEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'ckeditor',
                template: '<ng-template></ng-template>',
                // Integration with @angular/forms.
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => CKEditorComponent)),
                        multi: true,
                    }
                ]
            }] }
];
/** @nocollapse */
CKEditorComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
CKEditorComponent.propDecorators = {
    editor: [{ type: Input }],
    config: [{ type: Input }],
    data: [{ type: Input }],
    tagName: [{ type: Input }],
    disabled: [{ type: Input }],
    ready: [{ type: Output }],
    change: [{ type: Output }],
    blur: [{ type: Output }],
    focus: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CKEditorModule {
}
CKEditorModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule, CommonModule],
                declarations: [CKEditorComponent],
                exports: [CKEditorComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CKEditorComponent, CKEditorModule };

//# sourceMappingURL=ckeditor-ckeditor5-angular.js.map