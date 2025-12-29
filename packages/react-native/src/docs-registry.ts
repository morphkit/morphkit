import React from "react";

import AvatarDocs from "./avatar/README.mdx";
import BadgeDocs from "./badge/README.mdx";
import BoxDocs from "./box/README.mdx";
import ButtonDocs from "./button/README.mdx";
import CardDocs from "./card/README.mdx";
import CheckboxDocs from "./checkbox/README.mdx";
import ContainerDocs from "./container/README.mdx";
import DividerDocs from "./divider/README.mdx";
import InputDocs from "./input/README.mdx";
import LabelDocs from "./label/README.mdx";
import RadioDocs from "./radio/README.mdx";
import SelectDocs from "./select/README.mdx";
import SliderDocs from "./slider/README.mdx";
import StackDocs from "./stack/README.mdx";
import SwitchDocs from "./switch/README.mdx";
import TextareaDocs from "./textarea/README.mdx";
import TypographyDocs from "./typography/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  avatar: AvatarDocs,
  badge: BadgeDocs,
  box: BoxDocs,
  button: ButtonDocs,
  card: CardDocs,
  checkbox: CheckboxDocs,
  container: ContainerDocs,
  divider: DividerDocs,
  input: InputDocs,
  label: LabelDocs,
  radio: RadioDocs,
  select: SelectDocs,
  slider: SliderDocs,
  stack: StackDocs,
  switch: SwitchDocs,
  textarea: TextareaDocs,
  typography: TypographyDocs,
};
