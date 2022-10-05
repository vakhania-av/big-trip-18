import { render, remove, RenderPosition } from '../framework/render';
import EventEditView from '../view/event-edit-view.js';
import { UserAction, UPDATE_TYPE, FORM_TYPE, BLANK_POINT } from '../const.js';
import { isEscKey } from '../utils.js';

const { AFTERBEGIN } = RenderPosition;

export default class NewPointPresenter {
  #pointListContainer = null;
  #editFormComponent = null;
  #pointsModel = null;
  #changeData = null;
  #destroyCallback = null;

  constructor (pointListContainer, changeData, pointModel) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#pointsModel = pointModel;
  }

  get blankPoint () {
    return { ...BLANK_POINT };
  }

  get offers () {
    return this.#pointsModel.offers;
  }

  get destinations () {
    return this.#pointsModel.destinations;
  }

  init = (cb) => {
    this.#destroyCallback = cb;

    if (this.#editFormComponent !== null) {
      return;
    }

    this.#editFormComponent = new EventEditView(this.blankPoint, this.offers, this.destinations, FORM_TYPE.CREATING);
    this.#editFormComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editFormComponent.setItemClickHandler(this.#handleCloseEditForm);
    this.#editFormComponent.setCancelClickHandler(this.#handleCancelClick);

    render(this.#editFormComponent, this.#pointListContainer, AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownClickHandler);

  };

  destroy = () => {
    if (!this.#editFormComponent) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editFormComponent);
    this.#editFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownClickHandler);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(UserAction.ADD_POINT, UPDATE_TYPE.MINOR, point);
    document.removeEventListener('keydown', this.#escKeyDownClickHandler);
  };

  #handleCloseEditForm = () => {
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownClickHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  setSaving = () => {
    this.#editFormComponent.updateElement({
      isDisabled: true,
      isSaving: true
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#editFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#editFormComponent.shake(resetFormState);
  };
}
