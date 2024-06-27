import { FreeTrial } from "@/repository";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateURL(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function* streamReader(res: Response) {
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  if (reader == null) return;

  while (true) {
    const { done, value } = await reader.read();
    const chunk = decoder.decode(value);
    yield chunk;
    if (done) break;
  }
}

export async function updateFreeTrial({ freeTrialFromDB }: { freeTrialFromDB: any }) {
  if (!freeTrialFromDB) throw new Error('Debes proporcionar el objeto "freeTrialFromDB"');

  // Valida si el número de componentes generados es mayor o igual que 4, si es así, termina la pruebra gratis, sino, solo aumenta el número de componentes generados.
  // freeTrialFromDB.gen_count <= 4
  //   ? (freeTrialFromDB = await FreeTrial.update(freeTrialFromDB.id, {
  //       gen_count: freeTrialFromDB.gen_count + 1,
  //       active: false,
  //       endDate: new Date(),
  //     }))
  //   : (freeTrialFromDB = await FreeTrial.update(freeTrialFromDB.id, {
  //       gen_count: freeTrialFromDB.gen_count + 1,
  //     }));

  // Aumenta el número de componentes generados en la prueba gratis.
  freeTrialFromDB = await FreeTrial.update(freeTrialFromDB.id, {
    gen_count: freeTrialFromDB.gen_count + 1,
  });
  
}

export async function getFileFromClipboard(callback: (file: File) => Promise<void> | void) {
  const clipboardData = await navigator.clipboard.read();
  for (const item of clipboardData) {
    if (item.types.includes("image/png")) {
      const blob = await item.getType("image/png");
      const file = new File([blob], "component.png", { type: "image/png" });

      callback(file);
    }
  }
}
