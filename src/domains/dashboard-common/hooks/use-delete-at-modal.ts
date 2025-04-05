import { useQueryClient } from '@tanstack/react-query';
import { useDeleteSituation } from '../../dashboard-situations/api/delete-situations';
import { toast } from 'sonner';

export function useDeleteSituAtModal(
  onOpenChange: (open: boolean) => void,
  situationId: number | null
) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteSituation();

  const handleConfirmDeleteSitu = async () => {
    if (situationId) {
      mutate(situationId, {
        onSuccess: () => {
          toast.success('상황이 성공적으로 삭제되었습니다.');
          onOpenChange(false);
          // 삭제 후 상황 목록 데이터 갱신
          queryClient.invalidateQueries({
            queryKey: ['getSituationsInfinite'],
          });
        },
        onError: (error) => {
          console.error('삭제 오류:', error);
          toast.error('상황 삭제 중 오류가 발생했습니다.');
        },
      });
    }
  };

  return { isPending, handleConfirmDeleteSitu };
}
