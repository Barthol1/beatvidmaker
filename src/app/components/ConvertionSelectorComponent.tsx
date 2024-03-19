import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import style from "../home.module.css";

export default function ConvertionSelectorComponent(props: any) {
  const onChange = (value: any) => {
    console.log(value);
    props.onConvertionSelectorChange(value);
  };
  return (
    <div className={style.center + " m-2"}>
      <RadioGroup defaultValue="download" onValueChange={onChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="download" id="r1" />
          <Label htmlFor="r1">Download</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="youtube" id="r2" />
          <Label htmlFor="r2">Youtube</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
