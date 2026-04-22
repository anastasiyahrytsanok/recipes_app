import { useState } from "react";

import { readFileAsDataUrl } from "../lib/readFileAsDataUrl";
import { validateRecipeForm } from "../lib/recipeFormValidation";
import { recipeFormInitialValues } from "../model/recipeFormInitialValues";
import type { RecipeFormContent, RecipeFormValues } from "../model/types";

import "./RecipeForm.css";

type RecipeFormProps = {
  title: string;
  content: RecipeFormContent;
  isSubmitting: boolean;
  initialValues?: RecipeFormValues;
  onCancel: () => void;
  onSubmit: (values: RecipeFormValues) => void | Promise<void>;
};

const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const RecipeForm = ({
  title,
  content,
  isSubmitting,
  initialValues = recipeFormInitialValues,
  onCancel,
  onSubmit,
}: RecipeFormProps) => {
  const [formData, setFormData] = useState<RecipeFormValues>(initialValues);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>(initialValues.image);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage("");

    const validationError = validateRecipeForm(formData, content.messages);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
        return;
      }

      setErrorMessage(content.messages.saveError);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage(content.messages.imageSizeError);
      return;
    }

    try {
      const base64 = await readFileAsDataUrl(file);

      setImagePreview(base64);

      setFormData((prevState) => ({
        ...prevState,
        image: base64,
      }));
    } catch {
      setErrorMessage(content.messages.imageReadError);
    }
  };

  return (
    <div className="recipe-form">
      <div className="recipe-form__card">
        <h2 className="recipe-form__title">{title}</h2>

        <form className="recipe-form__form" onSubmit={handleSubmit}>
          <div className="recipe-form__group">
            <label className="recipe-form__field-label" htmlFor="recipe-name">
              {content.fields.name.label}
            </label>

            <input
              className="recipe-form__input"
              id="recipe-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={content.fields.name.placeholder}
            />
          </div>

          <div className="recipe-form__row recipe-form__row--double">
            <div className="recipe-form__group">
              <label
                className="recipe-form__field-label"
                htmlFor="recipe-cuisine"
              >
                {content.fields.cuisine.label}
              </label>

              <input
                className="recipe-form__input"
                id="recipe-cuisine"
                name="cuisine"
                type="text"
                value={formData.cuisine}
                onChange={handleInputChange}
                placeholder={content.fields.cuisine.placeholder}
              />
            </div>

            <div className="recipe-form__group">
              <label
                className="recipe-form__field-label"
                htmlFor="recipe-difficulty"
              >
                {content.fields.difficulty.label}
              </label>

              <select
                className="recipe-form__select"
                id="recipe-difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                <option value="">
                  {content.fields.difficulty.placeholder}
                </option>

                {content.fields.difficulty.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="recipe-form__row">
            <div className="recipe-form__group">
              <label className="recipe-form__field-label" htmlFor="prep-time">
                {content.fields.prepTimeMinutes.label}
              </label>

              <input
                className="recipe-form__input"
                id="prep-time"
                name="prepTimeMinutes"
                type="number"
                value={formData.prepTimeMinutes}
                onChange={handleInputChange}
                placeholder={content.fields.prepTimeMinutes.placeholder}
              />
            </div>

            <div className="recipe-form__group">
              <label className="recipe-form__field-label" htmlFor="cook-time">
                {content.fields.cookTimeMinutes.label}
              </label>

              <input
                className="recipe-form__input"
                id="cook-time"
                name="cookTimeMinutes"
                type="number"
                value={formData.cookTimeMinutes}
                onChange={handleInputChange}
                placeholder={content.fields.cookTimeMinutes.placeholder}
              />
            </div>

            <div className="recipe-form__group">
              <label className="recipe-form__field-label" htmlFor="servings">
                {content.fields.servings.label}
              </label>

              <input
                className="recipe-form__input"
                id="servings"
                name="servings"
                type="number"
                value={formData.servings}
                onChange={handleInputChange}
                placeholder={content.fields.servings.placeholder}
              />
            </div>
          </div>

          <div className="recipe-form__group">
            <label className="recipe-form__field-label" htmlFor="recipe-image">
              {content.fields.image.label}
            </label>

            <input
              className="recipe-form__file-input-hidden"
              id="recipe-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            <label htmlFor="recipe-image" className="recipe-form__file-button">
              {content.fields.image.buttonText}
            </label>

            <p className="recipe-form__file-hint">
              {content.fields.image.hint}
            </p>

            {imagePreview && (
              <div className="recipe-form__image-preview">
                <img
                  className="recipe-form__preview-image"
                  src={imagePreview}
                  alt={content.imagePreviewAlt}
                />
              </div>
            )}
          </div>

          <div className="recipe-form__group">
            <label className="recipe-form__field-label" htmlFor="recipe-tags">
              {content.fields.tags.label}
            </label>

            <input
              className="recipe-form__input"
              id="recipe-tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder={content.fields.tags.placeholder}
            />
          </div>

          <div className="recipe-form__group">
            <label className="recipe-form__field-label" htmlFor="ingredients">
              {content.fields.ingredients.label}
            </label>

            <textarea
              className="recipe-form__textarea"
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              placeholder={content.fields.ingredients.placeholder}
              rows={6}
            />
          </div>

          <div className="recipe-form__group">
            <label className="recipe-form__field-label" htmlFor="instructions">
              {content.fields.instructions.label}
            </label>

            <textarea
              className="recipe-form__textarea"
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleInputChange}
              placeholder={content.fields.instructions.placeholder}
              rows={8}
            />
          </div>

          {errorMessage && <p className="recipe-form__error">{errorMessage}</p>}

          <div className="recipe-form__actions">
            <button
              className="recipe-form__button recipe-form__button--secondary"
              type="button"
              onClick={onCancel}
            >
              {content.buttons.cancel}
            </button>

            <button
              className="recipe-form__button recipe-form__button--primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? content.buttons.loading : content.buttons.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
