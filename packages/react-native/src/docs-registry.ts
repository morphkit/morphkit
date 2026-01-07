import React from "react";

import AccordionDocs from "./accordion/README.mdx";
import AlertDocs from "./alert/README.mdx";
import AvatarDocs from "./avatar/README.mdx";
import BadgeDocs from "./badge/README.mdx";
import BoxDocs from "./box/README.mdx";
import ButtonDocs from "./button/README.mdx";
import CardDocs from "./card/README.mdx";
import CheckboxDocs from "./checkbox/README.mdx";
import ContainerDocs from "./container/README.mdx";
import DividerDocs from "./divider/README.mdx";
import FABDocs from "./fab/README.mdx";
import InputDocs from "./input/README.mdx";
import LabelDocs from "./label/README.mdx";
import OTPInputDocs from "./otp-input/README.mdx";
import ProgressDocs from "./progress/README.mdx";
import RadioDocs from "./radio/README.mdx";
import SelectDocs from "./select/README.mdx";
import SkeletonDocs from "./skeleton/README.mdx";
import SliderDocs from "./slider/README.mdx";
import SpinnerDocs from "./spinner/README.mdx";
import StackDocs from "./stack/README.mdx";
import SwitchDocs from "./switch/README.mdx";
import TagDocs from "./tag/README.mdx";
import TabsDocs from "./tabs/README.mdx";
import TextareaDocs from "./textarea/README.mdx";
import ToastDocs from "./toast/README.mdx";
import TypographyDocs from "./typography/README.mdx";

export const docsRegistry: Record<string, React.FC> = {
  accordion: AccordionDocs,
  alert: AlertDocs,
  avatar: AvatarDocs,
  badge: BadgeDocs,
  box: BoxDocs,
  button: ButtonDocs,
  card: CardDocs,
  checkbox: CheckboxDocs,
  container: ContainerDocs,
  divider: DividerDocs,
  fab: FABDocs,
  input: InputDocs,
  label: LabelDocs,
  "otp-input": OTPInputDocs,
  progress: ProgressDocs,
  radio: RadioDocs,
  select: SelectDocs,
  skeleton: SkeletonDocs,
  slider: SliderDocs,
  spinner: SpinnerDocs,
  stack: StackDocs,
  switch: SwitchDocs,
  tag: TagDocs,
  tabs: TabsDocs,
  textarea: TextareaDocs,
  toast: ToastDocs,
  typography: TypographyDocs,
};
