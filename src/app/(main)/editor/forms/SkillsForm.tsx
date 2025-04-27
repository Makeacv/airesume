import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
//something to commit
export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
    },
  });

  const { watch, formState: { isValid } } = form;
  const skills = watch("skills") ?? [];
  const lastSynced = useRef<string[]>(resumeData.skills || []);

  useEffect(() => {
    if (!isValid) return;
    const trimmed: string[] = skills.map((s) => s?.trim() ?? "").filter(Boolean);
    if (JSON.stringify(trimmed) === JSON.stringify(lastSynced.current)) return;
    setResumeData({
      ...resumeData,
      skills: trimmed,
    });
    lastSynced.current = trimmed;
  }, [skills, isValid, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Strengths</h2>
        <p className="text-sm text-muted-foreground">What are you good at?</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Strengths</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="e.g. Honest, Hardworking, Reliable..."
                    onChange={(e) => {
                      const skills = e.target.value.split(",");
                      field.onChange(skills);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Separate each strength with a comma.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
