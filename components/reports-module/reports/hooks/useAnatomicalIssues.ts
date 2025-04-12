"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getAnatomicalIssuesAction,
  createAnatomicalIssueAction, 
  updateAnatomicalIssueAction,
  deleteAnatomicalIssueAction
} from '@/src/actions';
import { AnatomicalIssue } from '@/src/db/anatomicalIssue';
import { useCallback } from 'react';

export function useAnatomicalIssues(organizationId?: string) {
  const queryClient = useQueryClient();
  
  // Clé de cache pour les problèmes anatomiques
  const queryKey = ['anatomical-issues', organizationId];
  
  // Récupérer tous les problèmes anatomiques
  const { 
    data: issues, 
    isLoading, 
    error 
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const result = await getAnatomicalIssuesAction({ organizationId });
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Une erreur s'est produite");
      }
    }
  });
  
  // Créer un nouveau problème anatomique
  const createIssueMutation = useMutation({
    mutationFn: async (issueData: Omit<AnatomicalIssue, 'id'>) => {
      try {
        const result = await createAnatomicalIssueAction(issueData);
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Erreur lors de la création");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
  
  // Mettre à jour un problème anatomique
  const updateIssueMutation = useMutation({
    mutationFn: async (issueData: AnatomicalIssue) => {
      try {
        const result = await updateAnatomicalIssueAction(issueData);
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Erreur lors de la mise à jour");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
  
  // Supprimer un problème anatomique
  const deleteIssueMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const result = await deleteAnatomicalIssueAction({ id });
        return result;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("Erreur lors de la suppression");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });
  
  // Fonctions simplifiées pour manipuler les problèmes anatomiques
  const createIssue = useCallback((issueData: Omit<AnatomicalIssue, 'id'>) => {
    return createIssueMutation.mutateAsync(issueData);
  }, [createIssueMutation]);
  
  const updateIssue = useCallback((issueData: AnatomicalIssue) => {
    return updateIssueMutation.mutateAsync(issueData);
  }, [updateIssueMutation]);
  
  const deleteIssue = useCallback((id: string) => {
    return deleteIssueMutation.mutateAsync(id);
  }, [deleteIssueMutation]);
  
  return {
    issues,
    isLoading,
    error,
    createIssue,
    updateIssue,
    deleteIssue,
    createIssueMutation,
    updateIssueMutation,
    deleteIssueMutation
  };
} 