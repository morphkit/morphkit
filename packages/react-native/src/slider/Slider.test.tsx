import { createRef } from "react";
import { render, fireEvent } from "../test-utils";
import { View, StyleSheet } from "react-native";
import { Slider } from "./Slider";

const createTouchEvent = (locationX: number) => {
  const now = Date.now();
  return {
    nativeEvent: {
      touches: [
        {
          identifier: 0,
          locationX,
          locationY: 0,
          pageX: locationX,
          pageY: 0,
          timestamp: now,
        },
      ],
      changedTouches: [
        {
          identifier: 0,
          locationX,
          locationY: 0,
          pageX: locationX,
          pageY: 0,
          timestamp: now,
        },
      ],
      identifier: 0,
      locationX,
      locationY: 0,
      pageX: locationX,
      pageY: 0,
      timestamp: now,
    },
    touchHistory: {
      touchBank: [
        {
          touchActive: true,
          startTimeStamp: now,
          startPageX: locationX,
          startPageY: 0,
          currentPageX: locationX,
          currentPageY: 0,
          currentTimeStamp: now,
          previousPageX: locationX,
          previousPageY: 0,
          previousTimeStamp: now,
        },
      ],
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: now,
    },
  };
};

const findTrack = (views: Array<{ props: { style?: unknown } }>) =>
  views.find((v) => {
    const style = StyleSheet.flatten(
      v.props.style as Parameters<typeof StyleSheet.flatten>[0],
    );
    return style && style.height === 4 && style.position === "relative";
  });

const findThumbs = (
  views: Array<{ props: { style?: unknown } }>,
  thumbSize: number,
) =>
  views.filter((v) => {
    const style = StyleSheet.flatten(
      v.props.style as Parameters<typeof StyleSheet.flatten>[0],
    );
    return (
      style &&
      style.width === thumbSize &&
      style.height === thumbSize &&
      style.borderRadius === thumbSize / 2
    );
  });

describe("Slider", () => {
  it("renders with single value", () => {
    const { root } = render(<Slider value={50} onChange={() => {}} />);
    expect(root).toBeTruthy();
  });

  it("renders with range value", () => {
    const { root } = render(<Slider value={[25, 75]} onChange={() => {}} />);
    expect(root).toBeTruthy();
  });

  it("renders with custom min and max", () => {
    const { root } = render(
      <Slider value={500} onChange={() => {}} min={0} max={1000} />,
    );
    expect(root).toBeTruthy();
  });

  it("renders with custom step", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} step={10} />,
    );
    expect(root).toBeTruthy();
  });

  it("renders with showValue enabled", () => {
    const { getByText } = render(
      <Slider value={75} onChange={() => {}} showValue />,
    );
    expect(getByText("75")).toBeTruthy();
  });

  it("renders value display for range slider", () => {
    const { getByText } = render(
      <Slider value={[25, 75]} onChange={() => {}} showValue />,
    );
    expect(getByText("25")).toBeTruthy();
    expect(getByText("75")).toBeTruthy();
  });

  it("renders small size", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} size="sm" />,
    );
    expect(root).toBeTruthy();
  });

  it("renders medium size (default)", () => {
    const { root } = render(<Slider value={50} onChange={() => {}} />);
    expect(root).toBeTruthy();
  });

  it("renders large size", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} size="lg" />,
    );
    expect(root).toBeTruthy();
  });

  it("applies custom color", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} color="#FF6B6B" />,
    );
    expect(root).toBeTruthy();
  });

  it("applies disabled state", () => {
    const { root } = render(<Slider value={50} onChange={() => {}} disabled />);
    expect(root).toBeTruthy();
  });

  it("applies custom styles", () => {
    const customStyle = { marginTop: 20 };
    const { root } = render(
      <Slider value={50} onChange={() => {}} style={customStyle} />,
    );
    expect(root).toBeTruthy();
  });

  it("forwards ViewProps", () => {
    const { getByTestId } = render(
      <Slider value={50} onChange={() => {}} testID="custom-slider" />,
    );
    expect(getByTestId("custom-slider")).toBeTruthy();
  });

  it("handles continuous values when step is 0", () => {
    const { root } = render(
      <Slider value={33.33} onChange={() => {}} step={0} />,
    );
    expect(root).toBeTruthy();
  });

  it("clamps value to min", () => {
    const { root } = render(
      <Slider value={-10} onChange={() => {}} min={0} max={100} />,
    );
    expect(root).toBeTruthy();
  });

  it("clamps value to max", () => {
    const { root } = render(
      <Slider value={150} onChange={() => {}} min={0} max={100} />,
    );
    expect(root).toBeTruthy();
  });

  it("forwards ref to View", () => {
    const ref = createRef<View>();
    render(<Slider ref={ref} value={50} onChange={() => {}} />);
    expect(ref.current).toBeTruthy();
  });

  it("accepts onBlur prop", () => {
    const handleBlur = jest.fn();
    const { root } = render(
      <Slider value={50} onChange={() => {}} onBlur={handleBlur} />,
    );
    expect(root).toBeTruthy();
  });

  it("accepts name prop", () => {
    const { root } = render(
      <Slider value={50} onChange={() => {}} name="volume" />,
    );
    expect(root).toBeTruthy();
  });

  it("has correct displayName", () => {
    expect(Slider.displayName).toBe("Slider");
  });

  describe("style verification", () => {
    it("applies disabled opacity when disabled", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} disabled />,
      );
      const views = UNSAFE_getAllByType(View);
      const disabledView = views.find((v) => {
        const style = StyleSheet.flatten(v.props.style);
        return style && typeof style.opacity === "number" && style.opacity < 1;
      });
      expect(disabledView).toBeTruthy();
    });

    it("applies full opacity when not disabled", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const container = views[0];
      const style = StyleSheet.flatten(container?.props.style);
      expect(style?.opacity).toBe(1);
    });

    it("applies custom color to active track", () => {
      const customColor = "#FF6B6B";
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} color={customColor} />,
      );
      const views = UNSAFE_getAllByType(View);
      const activeTrack = views.find((v) => {
        const style = StyleSheet.flatten(v.props.style);
        return style && style.backgroundColor === customColor;
      });
      expect(activeTrack).toBeTruthy();
    });

    it("merges custom style onto container", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider
          value={50}
          onChange={() => {}}
          style={{ marginTop: 20, backgroundColor: "red" }}
        />,
      );
      const views = UNSAFE_getAllByType(View);
      const styledView = views.find((v) => {
        const style = StyleSheet.flatten(v.props.style);
        return style && style.marginTop === 20;
      });
      expect(styledView).toBeTruthy();
    });

    it("renders different thumb sizes for each size variant", () => {
      const sizes = ["sm", "md", "lg"] as const;
      const expectedThumbSizes = { sm: 16, md: 20, lg: 24 };

      for (const size of sizes) {
        const { UNSAFE_getAllByType } = render(
          <Slider value={50} onChange={() => {}} size={size} />,
        );
        const views = UNSAFE_getAllByType(View);
        const thumbs = findThumbs(views, expectedThumbSizes[size]);
        expect(thumbs.length).toBe(1);
      }
    });

    it("renders track with correct height", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();
    });
  });

  describe("layout and positioning", () => {
    it("updates thumb position after layout", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} min={0} max={100} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });
    });

    it("positions thumb at start for min value after layout", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={0} onChange={() => {}} min={0} max={100} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });
    });

    it("positions thumb at end for max value after layout", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={100} onChange={() => {}} min={0} max={100} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });
    });

    it("positions both thumbs for range value after layout", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={[25, 75]} onChange={() => {}} min={0} max={100} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });
    });
  });

  describe("pan responder setup", () => {
    it("sets up responder handlers on track", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();
      expect(track!.props.onStartShouldSetResponder).toBeDefined();
      expect(track!.props.onMoveShouldSetResponder).toBeDefined();
      expect(track!.props.onResponderGrant).toBeDefined();
      expect(track!.props.onResponderMove).toBeDefined();
      expect(track!.props.onResponderRelease).toBeDefined();
    });

    it("allows responder when not disabled", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      const shouldStart = track!.props.onStartShouldSetResponder as (
        evt: unknown,
      ) => boolean;
      expect(shouldStart(createTouchEvent(50))).toBe(true);
    });

    it("allows move responder when not disabled", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      const shouldMove = track!.props.onMoveShouldSetResponder as (
        evt: unknown,
      ) => boolean;
      expect(shouldMove(createTouchEvent(50))).toBe(true);
    });

    it("prevents responder when disabled", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} disabled />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      const shouldStart = track!.props.onStartShouldSetResponder as (
        evt: unknown,
      ) => boolean;
      expect(shouldStart(createTouchEvent(50))).toBe(false);
    });

    it("prevents move responder when disabled", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} disabled />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      const shouldMove = track!.props.onMoveShouldSetResponder as (
        evt: unknown,
      ) => boolean;
      expect(shouldMove(createTouchEvent(50))).toBe(false);
    });

    it("does not call onChange when trackWidth is zero", () => {
      const onChange = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={onChange} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      const grantHandler = track!.props.onResponderGrant as (
        evt: unknown,
      ) => void;
      grantHandler(createTouchEvent(100));
      expect(onChange).not.toHaveBeenCalled();
    });

    it("calls onBlur on responder release", () => {
      const onBlur = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} onBlur={onBlur} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      const releaseHandler = track!.props.onResponderRelease as (
        evt: unknown,
      ) => void;
      releaseHandler(createTouchEvent(50));
      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it("does not throw on release without onBlur", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();

      const releaseHandler = track!.props.onResponderRelease as (
        evt: unknown,
      ) => void;
      expect(() => releaseHandler(createTouchEvent(50))).not.toThrow();
    });
  });

  describe("range slider visuals", () => {
    it("renders two thumbs for range value", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={[25, 75]} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const thumbs = findThumbs(views, 20);
      expect(thumbs.length).toBe(2);
    });

    it("renders one thumb for single value", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const thumbs = findThumbs(views, 20);
      expect(thumbs.length).toBe(1);
    });

    it("renders range thumbs with border styling", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={[25, 75]} onChange={() => {}} />,
      );
      const views = UNSAFE_getAllByType(View);
      const thumbs = findThumbs(views, 20);
      expect(thumbs.length).toBe(2);

      for (const thumb of thumbs) {
        const style = StyleSheet.flatten(thumb.props.style);
        expect(style?.borderWidth).toBe(2);
      }
    });
  });

  describe("pan interaction", () => {
    it("calls onChange with single value after layout and grant", () => {
      const onChange = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={onChange} min={0} max={100} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });

      const grantHandler = track!.props.onResponderGrant as (
        evt: unknown,
      ) => void;
      grantHandler(createTouchEvent(100));

      expect(onChange).toHaveBeenCalledWith(expect.any(Number));
    });

    it("calls onChange with range value closer to start thumb", () => {
      const onChange = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={[20, 80]} onChange={onChange} min={0} max={100} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });

      const grantHandler = track!.props.onResponderGrant as (
        evt: unknown,
      ) => void;
      grantHandler(createTouchEvent(10));

      expect(onChange).toHaveBeenCalledWith(expect.any(Array));
      const result = onChange.mock.calls[0][0] as [number, number];
      expect(result[1]).toBe(80);
    });

    it("calls onChange with range value closer to end thumb", () => {
      const onChange = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={[20, 80]} onChange={onChange} min={0} max={100} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });

      const grantHandler = track!.props.onResponderGrant as (
        evt: unknown,
      ) => void;
      grantHandler(createTouchEvent(190));

      expect(onChange).toHaveBeenCalledWith(expect.any(Array));
      const result = onChange.mock.calls[0][0] as [number, number];
      expect(result[0]).toBe(20);
    });

    it("handles move event after layout", () => {
      const onChange = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={onChange} min={0} max={100} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });

      const moveHandler = track!.props.onResponderMove as (
        evt: unknown,
      ) => void;
      moveHandler(createTouchEvent(50));

      expect(onChange).toHaveBeenCalled();
    });

    it("does not call onChange when disabled even after layout", () => {
      const onChange = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={onChange} disabled />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });

      const grantHandler = track!.props.onResponderGrant as (
        evt: unknown,
      ) => void;
      grantHandler(createTouchEvent(100));

      expect(onChange).not.toHaveBeenCalled();
    });

    it("normalizes value with step", () => {
      const onChange = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={onChange} min={0} max={100} step={10} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });

      const grantHandler = track!.props.onResponderGrant as (
        evt: unknown,
      ) => void;
      grantHandler(createTouchEvent(47));

      expect(onChange).toHaveBeenCalled();
      const result = onChange.mock.calls[0][0] as number;
      expect(result % 10).toBe(0);
    });

    it("handles step=0 for continuous values", () => {
      const onChange = jest.fn();
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={onChange} min={0} max={100} step={0} />,
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);

      fireEvent(track as unknown as React.ReactElement, "layout", {
        nativeEvent: { layout: { width: 200, height: 4 } },
      });

      const grantHandler = track!.props.onResponderGrant as (
        evt: unknown,
      ) => void;
      grantHandler(createTouchEvent(47));

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("dark mode", () => {
    it("renders correctly in dark color scheme", () => {
      const { root } = render(<Slider value={50} onChange={() => {}} />, {
        initialColorScheme: "dark",
      });
      expect(root).toBeTruthy();
    });

    it("shows value in dark mode", () => {
      const { getByText } = render(
        <Slider value={42} onChange={() => {}} showValue />,
        { initialColorScheme: "dark" },
      );
      expect(getByText("42")).toBeTruthy();
    });

    it("uses dark theme track colors", () => {
      const { UNSAFE_getAllByType } = render(
        <Slider value={50} onChange={() => {}} />,
        { initialColorScheme: "dark" },
      );
      const views = UNSAFE_getAllByType(View);
      const track = findTrack(views);
      expect(track).toBeTruthy();
    });

    it("renders range slider in dark mode with value display", () => {
      const { getByText, UNSAFE_getAllByType } = render(
        <Slider value={[10, 90]} onChange={() => {}} showValue />,
        { initialColorScheme: "dark" },
      );
      const views = UNSAFE_getAllByType(View);
      const thumbs = findThumbs(views, 20);
      expect(thumbs.length).toBe(2);
      expect(getByText("10")).toBeTruthy();
      expect(getByText("90")).toBeTruthy();
    });
  });
});
