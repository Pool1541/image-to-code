import { FreeTrial } from '@/repository';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

  freeTrialFromDB.gen_count === 4
    ? (freeTrialFromDB = await FreeTrial.update(freeTrialFromDB.id, {
        gen_count: freeTrialFromDB.gen_count + 1,
        active: false,
        endDate: new Date(),
      }))
    : (freeTrialFromDB = await FreeTrial.update(freeTrialFromDB.id, {
        gen_count: freeTrialFromDB.gen_count + 1,
      }));
}
