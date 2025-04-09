import {QueryableSelectViewModel, QueryParams} from "@/modules/components/TextField/QueryableSelectTextField/QueryableSelectTextField";
import {Template} from "@/services/@core/module/ResponseDataModels";
import {OptionItem} from "@/modules/components/buttons/multipleFilterButton/models/Interface";
import useTemplateRepository from "@/services/@template/respository/useTemplateRepository";
import {toGetTemplatesProps} from "@/app/template/models/RequestDataMapping";
import {GetTemplatesParameters} from "@/app/template/models/TemplateParameters";

export class TemplateListViewModel extends QueryableSelectViewModel<Template> {
    templateRepo = useTemplateRepository();

    override toOptionItem = (content: Template[]): OptionItem[] => {
        return content.map(item => {
            return {
                id: item.templateId,
                name: item.templateName
            }
        })
    }

    override call = async (queryParams: QueryParams) => {
        let eventType = ''
        let marketId = ''
        let sportIds: string[] = []

        if (queryParams.option?.['eventType']) {
            eventType = queryParams.option['eventType']
        }
        if (queryParams.option?.['marketId']) {
            marketId = queryParams.option['marketId']
        }
        if (queryParams.option?.['sportIds']) {
            sportIds = queryParams.option['sportIds']
        }

        const params: GetTemplatesParameters = {
            page: queryParams.page,
            pageSize: queryParams.pageSize,
            eventType: eventType,
            marketId: marketId,
            sportIds: sportIds
        };

        return await this.templateRepo.getTemplates(toGetTemplatesProps(params))
    }
}