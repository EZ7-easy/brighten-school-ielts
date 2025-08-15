"use client";

import { useRouter } from 'next/navigation'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { school } from "@/constants";
import { contactSchema } from "@/lib/validation";

function Banner() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      tel: "",
      name: "",
      school: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    localStorage.setItem("userData", JSON.stringify(values));
    router.push("/quiz/1");
  }
    
    return (
    <section className="relative w-full h-[400px] md:h-screen overflow-hidden">
      {/* Overlay Content */}
      <div className="relative z-10 flex justify-center items-center h-[400px] px-4 md:pr-12">
        <div className="bg-gray-900/90 text-white backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-lg">
          <p className="text-2xl md:text-3xl font-semibold mb-6">
            Birinchi imtihoningizga yoziling!
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="F.I.SH"
                        className="h-12 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004ff9]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Telefon raqam"
                        className="h-12 text-black bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004ff9]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full min-h-12 py-2 text-base text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004ff9]">
                          {/* SelectValue o‘rniga custom div */}
                          <div className="whitespace-normal break-words leading-snug text-left">
                            {field.value || "O'qish joyi"}
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {school.map((schoolItem, idx) => (
                            <SelectItem
                              key={idx}
                              value={schoolItem.name}
                              className="whitespace-normal break-words max-w-[300px]"
                            >
                              {schoolItem.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full h-12 text-xl bg-[#004ff9] hover:bg-[#0033cc] transition rounded-md"
              >
                TESTGA KIRISH
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Banner
