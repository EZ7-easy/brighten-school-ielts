import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function QuestionCard({
  question,
  options,
  selectedOption,
  onSelect,
}: {
  question: string;
  options: string[];
  selectedOption: number | null;
  onSelect: (value: number) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={
            selectedOption !== null ? selectedOption.toString() : undefined
          }
          onValueChange={(value) => onSelect(parseInt(value))}
        >
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
