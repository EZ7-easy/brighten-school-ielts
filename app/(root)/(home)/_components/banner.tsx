"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      tel: "",
      name: "",
      school: "",
    },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    setIsLoading(true);

    const telegramBotId = "8026261514:AAHiQ0nCdNVInbpcM_6Lu2w_iYMMpZiNyRE";
    const telegramChatId = "1764737921";

    const promise = fetch(
      `https://api.telegram.org/bot${telegramBotId}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: `
Name: ${values.name}
Tel: ${values.tel}
Place of study: ${values.school}
          `,
        }),
      }
    )
      .then(() => form.reset())
      .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Success",
      error: "Error",
    });
  };

  return (
    <section className="relative w-full h-[650px] md:h-screen overflow-hidden">
      {/* Overlay Content */}
      <div className="relative z-10 flex justify-center items-center h-full px-4 md:pr-12">
        <div className="bg-gray-900/90 text-white backdrop-blur-md p-6 md:p-10 rounded-2xl shadow-lg w-full max-w-lg">
          <p className="text-2xl md:text-3xl font-semibold mb-3">
            Sign up for your first exam!
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
                        placeholder="Ваше имя"
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
                        placeholder="99 999 99 99"
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
                            {field.value || "Place of Study"}
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
                Sign up
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}

export default Banner;
