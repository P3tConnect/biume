import { z } from "zod";
import { companyMembership, CreateCompanyMembershipSchema } from "../db";
import { db, ownerAction } from "../lib";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";

export const getCompanyMemberships = async ({
  companyId,
}: {
  companyId: string;
}) => {
  const data = await db.query.companyMembership
    .findMany({
      with: {
        company: true,
      },
      where: eq(companyMembership.companyId, companyId),
    })
    .execute();

  if (!data) {
    throw new Error("CompanyMemberships not found");
  }

  return data;
};

export const createCompanyMembership = ownerAction
  .input(CreateCompanyMembershipSchema)
  .handler(async ({ input }) => {
    const data = await db
      .insert(companyMembership)
      .values(input)
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyMembership not created");
    }

    return data;
  });

export const updateCompanyMembership = ownerAction
  .input(CreateCompanyMembershipSchema)
  .handler(async ({ input, ctx }) => {
    const data = await db
      .update(companyMembership)
      .set(input)
      .where(
        eq(companyMembership.companyId, ctx.company?.id as string) &&
          eq(companyMembership.userId, input.userId as string),
      )
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyMembership not updated");
    }

    return data;
  });

export const deleteCompanyMembership = ownerAction
  .input(z.string())
  .handler(async ({ input, ctx }) => {
    const data = await db
      .delete(companyMembership)
      .where(
        eq(companyMembership.companyId, ctx.company?.id as string) &&
          eq(companyMembership.userId, input),
      )
      .returning()
      .execute();

    if (!data) {
      throw new ZSAError("ERROR", "CompanyMembership not deleted");
    }
  });
