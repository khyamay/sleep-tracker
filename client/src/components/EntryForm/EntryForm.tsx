import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { addSleepEntry } from "@/api/sleepEntryApi";
import { ISleepEntry, SleepEntrySchema } from "@/types/schemas";
import { SnackbarType } from "@/types/types";

const EntryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ISleepEntry>({
    resolver: zodResolver(SleepEntrySchema),
    defaultValues: {
      gender: undefined
    }
  });
  const queryClient = useQueryClient();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: SnackbarType;
  } | null>(null);

  const mutation = useMutation({
    mutationFn: addSleepEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sleepEntries"] });
      reset();
      setSnackbar({
        message: "Sleep entry submitted successfully!",
        type: "success"
      });
      setTimeout(() => setSnackbar(null), 3000);
    },
    onError: (error) => {
      setSnackbar({ message: `Error: ${error}`, type: "error" });
      setTimeout(() => setSnackbar(null), 3000);
    }
  });

  const onSubmit = (data: ISleepEntry) => {
    mutation.mutate(data);
  };

  const labelClass = "form-control w-full max-w-xs";

  return (
    <>
      <Link
        to="/"
        className="mb-4 flex items-center hover:text-gray-400 transition duration-300 m-auto mt-6 w-96  text-gray-800"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        Back to Entries
      </Link>
      <div className="card bg-base-300 m-auto mt-6 w-96">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body ">
          <h3 className="prose-h3 text-lg ">Add new entry</h3>
          <div>
            <label className={labelClass}>
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required"
                })}
                placeholder="Full name"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className={labelClass}>
              <div className="label">
                <span className="label-text">Gender</span>
              </div>

              <select
                className="select select-bordered w-full max-w-xs"
                {...register("gender", {
                  required: "Gender is required"
                })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            {errors.gender && (
              <span className="text-xs text-red-500">
                {errors.gender.message}
              </span>
            )}
          </div>

          <div>
            <label className={labelClass}>
              <div className="label">
                <span className="label-text">Sleep Time Duration</span>
              </div>
              <input
                type="number"
                placeholder="Sleep time duration"
                {...register("sleepDuration", {
                  valueAsNumber: true,
                  required: "Sleep duration is required",
                  min: { value: 0, message: "Sleep duration must be positive" },
                  max: {
                    value: 24,
                    message: "Sleep duration cannot exceed 24 hours"
                  }
                })}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            {errors.sleepDuration && (
              <span className="text-xs text-red-500">
                {errors.sleepDuration.message}
              </span>
            )}
          </div>

          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Date</span>
              </div>
              <input
                type="date"
                {...register("entryDate", {
                  required: "Entry date is required.",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
                    return (
                      selectedDate <= currentDate ||
                      "Date cannot be in the future"
                    );
                  }
                })}
                placeholder="Select date"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            {errors.entryDate && (
              <span className="text-xs text-red-500">
                {errors.entryDate.message}
              </span>
            )}
          </div>

          <div className="w-full m-auto mt-4 flex justify-end card-actions">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      {snackbar?.type && (
        <div className="toast toast-bottom toast-right">
          <div
            className={`alert ${
              snackbar.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{snackbar.message}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EntryForm;
