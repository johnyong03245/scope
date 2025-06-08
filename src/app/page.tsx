// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function HomeRedirect() {
  redirect('/articles');
  return null; // Or a loading spinner if desired before redirect
}