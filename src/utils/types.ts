export type TIngredient = {
  readonly _id: string,
  readonly name: string,
  readonly type: string,
  readonly proteins: number,
  readonly fat:number,
  readonly carbohydrates: number,
  readonly calories: number,
  readonly price: number,
  readonly image: string,
  readonly image_mobile: string,
  readonly image_large: string,
  readonly __v: number
};

export type TFetchHeaders = {
  [header: string]: string,
}

export type TState = {
  from: { pathname: string },
  email?: string,
};

export type TStyle = {
  textDecoration?: 'none',
  color?: 'inherit',
  display?: 'flex',
  flexDirection?: 'column',
  justifyContent?: 'center',
  alignItems?: 'flex-start',
  minHeight?: number,
  minWidth?: number,
};

