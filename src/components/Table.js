import React from "react";
import {} from "../index.css";
import { format } from "date-fns";

function Table({ data, filter }) {
  return (
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light">
              <thead class="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" class="px-6 py-4">
                    Data
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Sys
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Dia
                  </th>
                  <th scope="col" class="px-6 py-4">
                    Puls
                  </th>
                  <th scope="col" class="px-6 py-4 invisible md:visible">
                    Autor
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map(
                  (masuratoare) =>
                    masuratoare.type === filter && (
                      <tr class="border-b dark:border-neutral-500">
                        <td class="whitespace-nowrap px-6 py-4 font-medium text-xs md:text-sm md:font-medium">{format(masuratoare.creation_date, "dd/MM/yyyy kk:mm:ss").toLocaleString()}</td>
                        <td class="whitespace-nowrap px-6 py-2 text-xs">{masuratoare.sys}</td>
                        <td class="whitespace-nowrap px-6 py-2 text-xs">{masuratoare.dia}</td>
                        <td class="whitespace-nowrap px-6 py-2 text-xs">{masuratoare.pulse}</td>
                        <td class="whitespace-nowrap px-6 py-2 text-xs invisible md:visible">{masuratoare.createdBy}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
