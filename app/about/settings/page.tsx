"use client";

import { title } from "@/components/primitives";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";

export default function SettingsPage() {
  return (
    <div>
      <h1 className={title()}>Settings</h1>
    </div>
  );
}